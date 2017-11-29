import {TextLine} from '../text-rendering/text-line';
import {RenderType} from '../text-rendering/render-type.enum';
import {TextTemplateProvider} from './text-template-provider';

export class CommandResponseManager {

  lines: TextLine[];

  constructor() {
    this.lines = [];
  }

  addLine(text: string, renderType: RenderType, data: any = null): TextLine {

    const line: TextLine = new TextLine(text, renderType, data);
    this.lines.push(line);

    return line;

  }

  addParserError(text: string, hint: string = null): TextLine {
    return this.addLine(text, RenderType.parserError, hint);
  }

  addStory(text: string, hint: string = null): TextLine {
    return this.addLine(text, RenderType.narrative, hint);
  }

  addRoomName(name: string): TextLine {
    return this.addLine(name, RenderType.roomName);
  }

  addBlankLine(): TextLine {
    return this.addLine('', RenderType.divider);
  }

  addSystem(text: string, hint: string = null): TextLine {
    return this.addLine(text, RenderType.engine, hint);
  }

  addPrompt(text: string): TextLine {
    return this.addLine(text, RenderType.enginePrompt);
  }

  addList(text: string, items: string[]): TextLine {
    return this.addLine(text, RenderType.list, items);
  }

  addSuccessAction(text: string): TextLine {
    return this.addLine(text, RenderType.successAction);
  }

  addTemplatedLine(text: string, renderType: RenderType, data: any): TextLine {

    if (text && text.indexOf('{{') >= 0) {
      text = TextTemplateProvider.instance.render(text, data);
    }
    return this.addLine(text, renderType, data);
  }

}
