import {LoggingService} from '../utility/logging.service';
import {Story} from './entities/story';
import {Room} from './entities/room';
import {Actor} from './entities/actor';
import {GoogleAnalyticsService} from '../utility/google-analytics.service';
import {Command} from './parser/command';
import {CommandResponseManager} from './command-response-manager';
import {InteractiveFictionEngine} from './interactive-fiction-engine';
import {ConfirmService} from '../common-ui/confirm.service';

export class CommandContext {

  get player(): Actor {
    return this.story.player;
  }

  get currentRoom(): Room {
    return this.player.currentRoom;
  }

  logger: LoggingService;
  analytics: GoogleAnalyticsService;
  confirmService: ConfirmService;
  command: Command;
  output: CommandResponseManager;
  wasConfused: boolean = false;

  private _engine: InteractiveFictionEngine;

  constructor(engine: InteractiveFictionEngine,
              confirmService: ConfirmService) {

    this._engine = engine;

    this.confirmService = confirmService;
    this.output = new CommandResponseManager();

    // These are commonly needed by classes and shouldn't be injected
    this.logger = LoggingService.instance;
    this.analytics = GoogleAnalyticsService.instance;

  }

  get story(): Story {
    return this.engine.story;
  }

  get engine(): InteractiveFictionEngine {
    return this._engine;
  }

  getString(key: string): string {
    return this.story.strings[key];
  }

}
