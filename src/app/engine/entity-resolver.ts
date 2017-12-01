import {CommandContext} from './command-context';
import {CommandToken} from './parser/command-token';
import {TokenClassification} from './parser/token-classification.enum';
import {StringHelper} from '../utility/string-helper';
import {GoogleAnalyticsService} from '../utility/google-analytics.service';
import {NaturalLanguageProcessor} from './parser/natural-language-processor';
import {LoggingService} from '../utility/logging.service';
import {EntityBase} from './entities/entity-base';

export class EntityResolver {

  static resolveDirections(context: CommandContext, tokens: CommandToken[]): void {

    const directions: CommandToken[] = tokens.filter(t => t.classification === TokenClassification.Direction);
    for (const dir of directions) {
      dir.entity = context.currentRoom.roomLink[dir.name];
    }

  }

  static resolveNouns(context: CommandContext, tokens: CommandToken[], announceConfusion: boolean): void {

    // TODO: This really shouldn't be in command context

    let isFirst: boolean = true;
    const confusedNames: string[] = [];

    const nouns: CommandToken[] = tokens.filter(t => t.classification === TokenClassification.Noun);
    for (const noun of nouns) {
      noun.entity = EntityResolver.getSingleObjectForToken(context, noun, announceConfusion);
      if (!noun.entity) {

        if (!NaturalLanguageProcessor.isSpecialNoun(noun)) {

          GoogleAnalyticsService.instance.emitEvent(
            'Token could not resolve to an entity',
            noun.name,
            `${context.story.name} - ${context.currentRoom.name}`);
        }

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
      context.output.addParserError(`You don't see ${StringHelper.toOxfordCommaList(confusedNames, 'or')} here.`);
    }

  }

  static getSingleObjectForToken(context: CommandContext, token: CommandToken, announceConfusion: boolean = true): EntityBase {

    const room = context.currentRoom;

    let entities: EntityBase[] = room.findObjectsForToken(token, context);

    // No matches yields an "it's not here" message
    if (!entities || entities.length <= 0) {
      LoggingService.instance.log(`No local match found for '${token.name}'`);

      if (!NaturalLanguageProcessor.isSpecialNoun(token)) {
        context.wasConfused = true;
      }
      return null;
    }

    // If we have more than one best match, show a disambiguation message
    if (entities.length > 1) {

      LoggingService.instance.warning(`Possible matches for '${token.name}': ${StringHelper.toOxfordCommaList(entities.map(e => e.name))}`);

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
          context.output.addParserError(`There is more than one object here matching that description. Can you be more specific?`);
        }

        context.wasConfused = true;

        return null;

      } else if (entities.length < 1) {
        throw new Error(`No results after disambiguating for token ${token.name} in ${room.key}`);
      }
    }

    const entity: EntityBase = entities[0];
    LoggingService.instance.log(`Match found for '${token.name}': ${entity.name}`);

    return entity;
  }


}
