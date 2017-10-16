import {Component, Input, OnInit} from '@angular/core';
import {TextLine} from '../text-line';

@Component({
  selector: 'if-line-renderer',
  templateUrl: './line-renderer.component.html',
  styleUrls: ['./line-renderer.component.css']
})
export class LineRendererComponent implements OnInit {

  @Input()
  line: TextLine;

  constructor() { }

  ngOnInit() {
  }

}
