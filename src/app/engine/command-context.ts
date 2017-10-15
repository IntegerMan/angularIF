import {TextOutputService} from './text-output.service';
import {LoggingService} from '../logging.service';
import {Story} from './story';
import {InteractiveFictionService} from './interactive-fiction.service';

export class CommandContext {

  logger: LoggingService;
  outputService: TextOutputService;
  ifService: InteractiveFictionService;
  story: Story;

  constructor(story: Story,
              ifService: InteractiveFictionService,
              outputService: TextOutputService,
              logger: LoggingService) {

    this.outputService = outputService;
    this.logger = logger;
    this.story = story;
    this.ifService = ifService;

  }

}
