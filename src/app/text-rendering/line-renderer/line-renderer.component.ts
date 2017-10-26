import {Component, Input, OnInit} from '@angular/core';
import {TextLine} from '../text-line';
import {MarkdownService} from '../markdown.service';

@Component({
  selector: 'if-line-renderer',
  templateUrl: './line-renderer.component.html',
  styleUrls: ['./line-renderer.component.css']
})
export class LineRendererComponent implements OnInit {

  @Input()
  line: TextLine;

  html: string;

  constructor(private markdown: MarkdownService) { }

  ngOnInit() {
    this.html = this.markdown.getHtml(this.line.text);
  }

}
