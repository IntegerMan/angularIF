import { EditorService } from '../editor.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'if-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorToolbarComponent implements OnInit {

  constructor(private editorService: EditorService) { }

  ngOnInit() {
  }

  onAddActorClick(): void {
    this.editorService.addActor();
  }

  onAddObjectClick(): void {
    this.editorService.addObject();
  }

  onAddRoomClick(): void {
    this.editorService.addRoom();    
  }

  onAddVerbClick(): void {
    this.editorService.addVerb();    
  }

  onAddAliasClick(): void {
    this.editorService.addAlias();    
  }

  onAddAttributeClick(): void {
    this.editorService.addAttribute();    
  }

  onAddEventClick(): void {
    this.editorService.addEvent();    
  }

}
