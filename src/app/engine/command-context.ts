import {TextOutputService} from './text-output.service';
import {LoggingService} from '../utility/logging.service';
import {Story} from './entities/story';
import {InteractiveFictionService} from './interactive-fiction.service';
import {Room} from './entities/room';
import {NavigationService} from './navigation.service';
import {Player} from './entities/player';
import {WorldEntity} from './entities/world-entity';
import {StringHelper} from '../utility/string-helper';
import {CommandToken} from './parser/command-token';
import {TokenizerService} from './parser/tokenizer.service';
import {GoogleAnalyticsService} from '../utility/google-analytics.service';
import {ConfirmationService} from 'primeng/primeng';
import {StateService} from './state.service';
import {ScoreService} from './score.service';

export class CommandContext {

  get player(): Player {
    return this.story.player;
  }

  get currentRoom(): Room {
    return this.player.currentRoom;
  }

  logger: LoggingService;
  analytics: GoogleAnalyticsService;
  outputService: TextOutputService;
  ifService: InteractiveFictionService;
  navService: NavigationService;
  confirmService: ConfirmationService;
  state: StateService;
  score: ScoreService;
  story: Story;
  wasConfused: boolean = false;

  constructor(ifService: InteractiveFictionService,
              outputService: TextOutputService,
              navService: NavigationService,
              confirmService: ConfirmationService,
              stateService: StateService,
              scoreService: ScoreService) {

    this.ifService = ifService;
    this.story = ifService.story;
    this.outputService = outputService;
    this.navService = navService;
    this.confirmService = confirmService;
    this.state = stateService;
    this.score = scoreService;

    // These are commonly needed by classes and shouldn't be injected
    this.logger = LoggingService.instance;
    this.analytics = GoogleAnalyticsService.instance;

  }

  getSingleObjectForToken(token: CommandToken, context: CommandContext): WorldEntity {

    // TODO: This shouldn't really live in the context object

    const entities: WorldEntity[] = this.currentRoom.findObjectsForToken(token, this);

    // No matches yields an "it's not here" message
    if (!entities || entities.length <= 0) {
      this.logger.log(`No local match found for '${token.name}'`);

      if (!TokenizerService.isSpecialNoun(token)) {

        this.analytics.emitEvent(
          'Reference Not Found',
          token.name,
          `${context.story.title} - ${context.currentRoom.name}`);

        this.outputService.displayParserError(`You don't see ${token.getCannotSeeName()} here.`);
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

}
