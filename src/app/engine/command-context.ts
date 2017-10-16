import {TextOutputService} from './text-output.service';
import {LoggingService} from '../logging.service';
import {Story} from './story';
import {InteractiveFictionService} from './interactive-fiction.service';
import {Room} from './room';
import {NavigationService} from './navigation.service';

export class CommandContext {

  get currentRoom(): Room {
    return this.story.player.currentRoom;
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

}
