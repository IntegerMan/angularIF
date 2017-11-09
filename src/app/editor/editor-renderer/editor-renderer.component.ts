import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {TreeNode} from 'primeng/primeng';

@Component({
  selector: 'if-editor-renderer',
  templateUrl: './editor-renderer.component.html',
  styleUrls: ['./editor-renderer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditorRendererComponent implements OnInit {

  @Input()
  node: TreeNode;

  constructor() { }

  ngOnInit() {
  }

}
