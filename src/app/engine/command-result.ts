import {Command} from './parser/command';
import {TextLine} from '../text-rendering/text-line';

export class CommandResult {

  succeeded: boolean = false;
  parsed: boolean = false;
  countsAsMove: boolean = false;
  command: Command = null;
  lines: TextLine[];

  static BuildParseFailedResult(): CommandResult {
    return new CommandResult();
  }

  static BuildActionFailedResult(): CommandResult {

    const result: CommandResult = new CommandResult();
    result.parsed = true;
    result.countsAsMove = true;
    result.succeeded = false;

    return result;
  }

  static BuildActionSuccessResult(): CommandResult {

    const result: CommandResult = new CommandResult();
    result.parsed = true;
    result.countsAsMove = true;
    result.succeeded = true;

    return result;

  }

  static BuildFreeActionResult(): CommandResult {

    const result: CommandResult = new CommandResult();
    result.parsed = true;
    result.countsAsMove = false;
    result.succeeded = true;

    return result;

  }

}
