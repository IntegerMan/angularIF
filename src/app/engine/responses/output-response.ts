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

  invoke(context: CommandContext, data: any): boolean {

    // TODO: We'll probably want a better context than this, but eh.
    if (!this.data) {
      this.data = context;
    }

    this.text = context.templater.applyTemplate(this.text, this.data);

    context.outputService.displayDynamic(this.text, this.renderType, this.data);

    return true;
  }

}

