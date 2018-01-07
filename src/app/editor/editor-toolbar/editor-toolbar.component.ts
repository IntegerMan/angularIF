import { Subscription } from 'rxjs/Rx';
import { EditorService } from '../editor.service';
import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatMenuTrigger} from '@angular/material';
import {EntityData} from '../../engine/story-data/entity-data';

@Component({
  selector: 'if-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorToolbarComponent implements OnInit, OnDestroy {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  breadcrumbs: any[];
  menuItems: any[];
  currentNode: any;

  private nodeSelectedSubscription: Subscription;

  constructor(private editorService: EditorService) {
    this.breadcrumbs = [];
    this.menuItems = [];
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

  onHomeClick(): void {
    this.editorService.selectNode(this.editorService.storyData);
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
    if (breadcrumb === this.editorService.selectedNode && this.menuItems.length > 0) {
      this.trigger.openMenu();
    } else {
      this.editorService.selectNode(breadcrumb);
    }
  }

  onMenuItemClick(item: any): void {
    this.editorService.selectNode(item);
  }

  getBreadcrumbName(breadcrumb: any): string {

    if (!breadcrumb) {
      return '';
    }

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

    // Set the current node so we can render the selection
    this.currentNode = node;

    // Ensure the breadcrumbs reflect our current selection
    this.updateBreadcrumbs(node);
    this.updateMenuItems(node);

  }

  private updateMenuItems(node: EntityData | any): void {

    this.menuItems.length = 0;

    if (!node || !node.nodeType) {
      return;
    }

    let items: any[] = [];

    if (node.nodeType === 'room') {
      items = this.editorService.storyData.rooms;
    } else if (node.nodeType === 'actor') {
      items = this.editorService.storyData.actors;
    } else if (node.nodeType === 'entity') {
      items = node.parent.contents;
    } else if (node.nodeType === 'verbHandler') {
      items = node.parent.verbData;
    }

    // Populate the menu item list
    // TODO: May not be contents in all cases
    // items = node.parent.contents;

    if (items) {
      for (const item of items) {
        this.menuItems.push(item);
      }
    }

  }

  private updateBreadcrumbs(node: EntityData | any): void {

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
