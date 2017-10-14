import {CommandType} from './command-type.enum';

export class TextLine {

  text: string = '';
  commandType: CommandType;
  data: any;

  constructor(text: string, commmandType: CommandType) {
    this.text = text;
    this.commandType = commmandType;
  }
}
