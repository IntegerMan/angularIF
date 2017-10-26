import { Injectable } from '@angular/core';

@Injectable()
export class MarkdownService {

  private md: any;

  constructor() {
    const showdown = require('showdown');
    this.md = new showdown.Converter();

    // We don't want people to lose their progress by clicking a link!
    this.md.setOption('openLinksInNewWindow', true);
  }

  getHtml(markdown: string): string {
    return this.md.makeHtml(markdown);
  }

}
