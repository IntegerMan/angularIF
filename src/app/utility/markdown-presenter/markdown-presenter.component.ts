import {MarkdownService} from '../../text-rendering/markdown.service';
import {LoggingService} from '../logging.service';
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'if-md',
  templateUrl: './markdown-presenter.component.html',
  styleUrls: ['./markdown-presenter.component.css']
})
export class MarkdownPresenterComponent implements OnInit {

  @Input()
  text: string;

  public html: string = '';

  constructor(private markdownService: MarkdownService) {

  }

  ngOnInit() {

    LoggingService.instance.debug(`Translating from markdown ${this.text}`);
    if (this.text) {
      this.html = this.markdownService.getHtml(this.text);
    }
    LoggingService.instance.debug(`HTML is ${this.html}`);

  }

}
