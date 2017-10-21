import {RenderType} from './render-type.enum';

export class TextLine {

  text: string = '';
  commandType: RenderType;
  data: any;

  constructor(text: string, commmandType: RenderType, data: any = null) {
    this.text = text;
    this.commandType = commmandType;
    this.data = data;
  }
}
