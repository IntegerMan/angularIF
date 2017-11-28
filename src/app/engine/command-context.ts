import {TextOutputService} from './text-output.service';
import {LoggingService} from '../utility/logging.service';
import {Story} from './entities/story';
import {InteractiveFictionService} from './interactive-fiction.service';
import {Room} from './entities/room';
import {Actor} from './entities/actor';
import {StringHelper} from '../utility/string-helper';
import {CommandToken} from './parser/command-token';
import {NaturalLanguageService} from './parser/natural-language.service';
import {GoogleAnalyticsService} from '../utility/google-analytics.service';
import {ConfirmationService} from 'primeng/primeng';
import {StateService} from './state.service';
import {ScoreService} from './score.service';
import {TokenClassification} from './parser/token-classification.enum';
import {TemplatingService} from './parser/templating.service';
import {Command} from './parser/command';
import {EntityBase} from './entities/entity-base';

export class CommandContext {

  get player(): Actor {
    return this.story.player;
  }

  get currentRoom(): Room {
    return this.player.currentRoom;
  }

  logger: LoggingService;
  templater: TemplatingService;
  analytics: GoogleAnalyticsService;
  outputService: TextOutputService;
  ifService: InteractiveFictionService;
  confirmService: ConfirmationService;
  state: StateService;
  score: ScoreService;
  story: Story;
  command: Command;
  wasConfused: boolean = false;

  constructor(ifService: InteractiveFictionService,
              outputService: TextOutputService,
              confirmService: ConfirmationService,
              templatingService: TemplatingService,
              stateService: StateService,
              scoreService: ScoreService) {

    this.ifService = ifService;
    this.story = ifService.story;
    this.outputService = outputService;
    this.confirmService = confirmService;
    this.templater = templatingService;
    this.state = stateService;
    this.score = scoreService;

    // These are commonly needed by classes and shouldn't be injected
    this.logger = LoggingService.instance;
    this.analytics = GoogleAnalyticsService.instance;

  }

  getSingleObjectForToken(token: CommandToken, announceConfusion: boolean = true): EntityBase {

    // TODO: This shouldn't really live in the context object

    let entities: EntityBase[] = this.currentRoom.findObjectsForToken(token, this);

    // No matches yields an "it's not here" message
    if (!entities || entities.length <= 0) {
      this.logger.log(`No local match found for '${token.name}'`);

      if (!NaturalLanguageService.isSpecialNoun(token)) {

        this.analytics.emitEvent(
          'Reference Not Found',
          token.name,
          `${this.story.name} - ${this.currentRoom.name}`);
        this.wasConfused = true;
      }
      return null;
    }

    // If we have more than one best match, show a disambiguation message
    if (entities.length > 1) {

      this.logger.warning(`Possible matches for '${token.name}': ${StringHelper.toOxfordCommaList(entities.map(e => e.name))}`);

      // Set the initial score of each object
      for (const e of entities) {
        (<any>e).disambiguationScore = 1;
      }

      // Tally up our scoring based on the modifiers attached to this entity and how well they map to the entity.
      for (const t of token.modifiedBy) {
        for (const e of entities) {
          if (e.adjectives.indexOf(t.name) >= 0) {
            (<any>e).disambiguationScore += 1;
          } else if (e.nouns.indexOf(t.name) >= 0) {
            (<any>e).disambiguationScore += 1;
          } else {
            // The user was off a little so we'll penalize it to help others shine, but not enough to disqualify it
            (<any>e).disambiguationScore -= 0.5;
          }
        }
      }

      // Figure out which item performed the best
      const maxScore: number = Math.max.apply(Math, entities.map(e => (<any>e).disambiguationScore));

      // Whittle down to the best result based on our disambiguation score.
      entities = entities.filter(e => (<any>e).disambiguationScore === maxScore);

      // If we're still confused but we have an 'of' preposition, piggy back onto its resolution.
      if (entities.length > 1) {

        const ofTokens = token.modifiedBy.filter(m => m.name === 'of' && m.previousToken && m.previousToken.entity);
        if (ofTokens.length > 0) {
          entities = [ofTokens[0].previousToken.entity];
        }
      }

      if (entities.length > 1) {

        if (announceConfusion) {
          this.outputService.displayParserError(`There is more than one object here matching that description. Can you be more specific?`);
        }

        this.wasConfused = true;

        return null;

      } else if (entities.length < 1) {
        throw new Error(`No results after disambiguating for token ${token.name} in ${this.currentRoom.key}`);
      }
    }

    const entity: EntityBase = entities[0];
    this.logger.log(`Match found for '${token.name}': ${entity.name}`);

    return entity;
  }

  resolveNouns(tokens: CommandToken[], announceConfusion: boolean): void {

    // TODO: This really shouldn't be in command context

    let isFirst: boolean = true;
    const confusedNames: string[] = [];

    const nouns: CommandToken[] = tokens.filter(t => t.classification === TokenClassification.Noun);
    for (const noun of nouns) {
      noun.entity = this.getSingleObjectForToken(noun, announceConfusion);
      if (!noun.entity) {
        if (isFirst) {
          confusedNames.push(noun.getCannotSeeName());
          isFirst = false;
        } else {
          confusedNames.push(noun.name);
        }
      }
    }

    // Tell the user all of the mistakes they made in one go.
    if (confusedNames.length > 0 && announceConfusion) {
      this.outputService.displayParserError(`You don't see ${StringHelper.toOxfordCommaList(confusedNames, 'or')} here.`);
    }

  }

  resolveDirections(tokens: CommandToken[]): void {

    const directions: CommandToken[] = tokens.filter(t => t.classification === TokenClassification.Direction);
    for (const dir of directions) {
      dir.entity = this.currentRoom.roomLink[dir.name];
    }

  }

  getString(key: string): string {
    return this.story.strings[key];
  }

}
