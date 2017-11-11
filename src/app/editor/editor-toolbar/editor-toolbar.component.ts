import { Subscription } from 'rxjs/Rx';
import { EditorService } from '../editor.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'if-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorToolbarComponent implements OnInit, OnDestroy {

  breadcrumbs: any[];

  private nodeSelectedSubscription: Subscription;

  constructor(private editorService: EditorService) { 
    this.breadcrumbs = [];
  }

  ngOnInit() {
    this.nodeSelectedSubscription = this.editorService.nodeSelected.subscribe(node => this.onNodeSelected(node));

    this.onNodeSelected(this.editorService.selectedNode);
  }

  ngOnDestroy(): void {
    if (this.nodeSelectedSubscription) {
      this.nodeSelectedSubscription.unsubscribe();
    }
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

  onBreadcrumbClick(breadcrumb: any): void {
    this.editorService.selectNode(breadcrumb);
  }

  getBreadcrumbName(breadcrumb: any): string {

    if (breadcrumb.nodeType) {
      if (breadcrumb.nodeType === 'strings') {
        return 'Strings';
      } else if (breadcrumb.nodeType === 'storyInfo') {
        return 'Story';
      }
    }

    if (breadcrumb.key) {
      return breadcrumb.key;
    }

    return breadcrumb.name;
  }

  private onNodeSelected(node: any): void {
    this.breadcrumbs.length = 0;

    // We're going to do an array.reverse so write it from leaf out to root

    while (node) {

      this.breadcrumbs.push(node);

      node = node.parent;
    }

    // Always have a story node (unless we're on the story node)
    if (this.breadcrumbs.indexOf(this.editorService.storyData) < 0) {
      this.breadcrumbs.push(this.editorService.storyData);
    }
    
    this.breadcrumbs.reverse();
  }  
  

}
