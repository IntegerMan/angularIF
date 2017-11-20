import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {EditorService} from '../editor.service';

declare const Clipboard: any;

@Component({
  selector: 'if-json-export',
  templateUrl: './json-export.component.html',
  styleUrls: ['./json-export.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JsonExportComponent implements OnInit {

  public json: string;

  constructor(private editorService: EditorService) {

  }

  ngOnInit() {
    this.json = this.editorService.getJSON();

    $('#jsonViewer').trigger('autoresize');

    const clipboard = new Clipboard('.btn');
  }

  download() {
    this.editorService.saveToJSON(this.json);
  }
}
