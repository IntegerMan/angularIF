import { Injectable } from '@angular/core';
import {TextTemplateProvider} from '../text-template-provider';

@Injectable()
export class TemplatingService {

  private templater: any;

  constructor() {
    this.templater = TextTemplateProvider.instance;
  }

  public applyTemplate(input: string, data: any): string {
    return this.templater.render(input, data);
  }

}
