import {TextOutputService} from './text-output.service';
import {LoggingService} from '../logging.service';
import {Story} from './entities/story';
import {InteractiveFictionService} from './interactive-fiction.service';
import {Room} from './entities/room';
import {NavigationService} from './navigation.service';
import {Player} from './entities/player';
import {WorldEntity} from './entities/world-entity';
import {StringHelper} from '../utility/string-helper';
import {CommandToken} from './parser/command-token';
import {TokenizerService} from './parser/tokenizer.service';

export class CommandContext {

  get player(): Player {
    return this.story.player;
  }

  get currentRoom(): Room {
    return this.player.currentRoom;
  }

  logger: LoggingService;
  outputService: TextOutputService;
  ifService: InteractiveFictionService;
  navService: NavigationService;
  story: Story;

  constructor(story: Story,
              ifService: InteractiveFictionService,
              outputService: TextOutputService,
              navService: NavigationService,
              logger: LoggingService) {

    this.outputService = outputService;
    this.logger = logger;
    this.story = story;
    this.navService = navService;
    this.ifService = ifService;

  }

  getSingleObjectForToken(token: CommandToken): WorldEntity {

    // TODO: This shouldn't really live in the context object

    const entities: WorldEntity[] = this.currentRoom.findObjectsForToken(token, this);

    // No matches yields an "it's not here" message
    if (!entities || entities.length <= 0) {
      this.logger.log(`No local match found for '${token.name}'`);

      if (!TokenizerService.isSpecialNoun(token)) {
        if (token.isPlural) {
          this.outputService.displayParserError(`You don't see ${token.name} here.`);
        } else if (StringHelper.startsWithVowel(token.name)) {
          this.outputService.displayParserError(`You don't see an ${token.name} here.`);
        } else {
          this.outputService.displayParserError(`You don't see a ${token.name} here.`);
        }
      }
      return null;
    }

    // If we have more than one best match, show a disambiguation message
    if (entities.length > 1) {

      this.logger.log(`Possible matches for '${token.name}': ${StringHelper.toOxfordCommaList(entities.map(e => e.name))}`);

      // TODO: Better disambiguation is needed here
      this.outputService.displayParserError(`There is more than one object here matching that description. Can you be more specific?`);

      return null;
    }

    const entity: WorldEntity = entities[0];
    this.logger.log(`Match found for '${token.name}': ${entity.name}`);

    return entity;
  }

}
