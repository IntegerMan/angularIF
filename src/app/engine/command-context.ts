import {TextOutputService} from './text-output.service';
import {LoggingService} from '../utility/logging.service';
import {Story} from './entities/story';
import {InteractiveFictionService} from './interactive-fiction.service';
import {Room} from './entities/room';
import {Actor} from './entities/actor';
import {WorldEntity} from './entities/world-entity';
import {StringHelper} from '../utility/string-helper';
import {CommandToken} from './parser/command-token';
import {TokenizerService} from './parser/tokenizer.service';
import {GoogleAnalyticsService} from '../utility/google-analytics.service';
import {ConfirmationService} from 'primeng/primeng';
import {StateService} from './state.service';
import {ScoreService} from './score.service';
import {TokenClassification} from './parser/token-classification.enum';
import {TemplatingService} from './parser/templating.service';

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

  getSingleObjectForToken(token: CommandToken): WorldEntity {

    // TODO: This shouldn't really live in the context object

    const entities: WorldEntity[] = this.currentRoom.findObjectsForToken(token, this);

    // No matches yields an "it's not here" message
    if (!entities || entities.length <= 0) {
      this.logger.log(`No local match found for '${token.name}'`);

      if (!TokenizerService.isSpecialNoun(token)) {

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

      this.logger.log(`Possible matches for '${token.name}': ${StringHelper.toOxfordCommaList(entities.map(e => e.name))}`);

      // TODO: Better disambiguation is needed here
      this.outputService.displayParserError(`There is more than one object here matching that description. Can you be more specific?`);

      this.wasConfused = true;

      return null;
    }

    const entity: WorldEntity = entities[0];
    this.logger.log(`Match found for '${token.name}': ${entity.name}`);

    return entity;
  }

  resolveNouns(tokens: CommandToken[]): void {

    let isFirst: boolean = true;
    const confusedNames: string[] = [];

    const nouns: CommandToken[] = tokens.filter(t => t.classification === TokenClassification.Noun);
    for (const noun of nouns) {
      noun.entity = this.getSingleObjectForToken(noun);
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
    if (confusedNames.length > 0) {
      this.outputService.displayParserError(`You don't see ${StringHelper.toOxfordCommaList(confusedNames, 'or')} here.`);
    }

  }

  getString(key: string): string {
    return this.story.strings[key];
  }

}
