import {StoryResponse} from './story-response';
import {RenderType} from '../../text-rendering/render-type.enum';
import {CommandContext} from '../command-context';

export class OutputResponse extends StoryResponse {

  private text: string;
  private renderType: RenderType;
  private data: any;

  constructor(text: string, renderType: RenderType = RenderType.narrative, data: any = null) {
    super();

    this.text = text;
    this.renderType = renderType;
    this.data = data;
  }

  invoke(context: CommandContext): void {
    context.outputService.displayDynamic(this.text, this.renderType, this.data);
  }

}

