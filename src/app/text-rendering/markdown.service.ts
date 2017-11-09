import { Injectable } from '@angular/core';
import {LoggingService} from '../utility/logging.service';

@Injectable()
export class MarkdownService {

  private md: any;

  constructor() {
    const showdown = require('showdown');
    this.md = new showdown.Converter();

    // We don't want people to lose their progress by clicking a link!
    this.md.setOption('openLinksInNewWindow', true);
  }

  getHtml(markdown: any): string {

    if (!markdown) {
      return null;
    }

    // Handle single strings
    if (typeof(markdown) === 'string') {
      return this.md.makeHtml(markdown);
    }

    // Handle arrays of strings
    if (markdown instanceof Array) {

      let out: string = '';

      for (const child of markdown) {
        out += this.getHtml(child);
      }

      return out;
    }

    // Well, this is bad. Log it.
    LoggingService.instance.warning('Cannot translate from non-string type to markdown HTML');
    LoggingService.instance.debug(markdown);

    return markdown;
  }

}
