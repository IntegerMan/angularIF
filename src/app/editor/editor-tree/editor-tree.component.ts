import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {TreeNode} from '../../../assets/primeng/components/common/treenode';
import {LoggingService} from '../../utility/logging.service';
import {StoryData} from '../../engine/story-data/story-data';

@Component({
  selector: 'if-editor-tree',
  templateUrl: './editor-tree.component.html',
  styleUrls: ['./editor-tree.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditorTreeComponent implements OnInit {

  @Input()
  story: StoryData;

  @Output()
  nodeSelected: EventEmitter<TreeNode>;

  nodes: TreeNode[] = [];
  selectedNode: TreeNode;

  private infoNode: TreeNode;
  private roomsNode: TreeNode;
  private actorsNode: TreeNode;

  constructor() {
    this.nodeSelected = new EventEmitter<TreeNode>();
  }

  ngOnInit() {
    this.populateNodesFromStory();
  }

  onNodeSelected($event: any): void {
    LoggingService.instance.debug($event);
    LoggingService.instance.debug(this.selectedNode);
    this.nodeSelected.emit(this.selectedNode);
  }

  private populateNodesFromStory() {

    LoggingService.instance.debug(this.story);

    this.nodes.length = 0;

    this.selectedNode = this.getStoryInfoNode();
    this.getActorsNode();
    this.getRoomsNode();

    this.nodeSelected.emit(this.selectedNode);
  }

  private getStoryInfoNode(): TreeNode {
    this.infoNode = {
      selectable: true,
      label: 'Story Info',
      type: 'storyInfo',
      data: this.story,
      droppable: false,
      draggable: false
    };
    this.nodes.push(this.infoNode);

    return this.infoNode;
  }

  private getRoomsNode(): TreeNode {
    this.roomsNode = {
      selectable: true,
      label: 'Rooms',
      type: 'roomsRoot',
      data: this.story,
      droppable: false,
      draggable: false,
      children: [],
      expanded: true
    };

    for (const room of this.story.rooms) {

      const childNode: TreeNode = {
        label: room.key, // Or room.name, but this is maybe more concise
        leaf: true,
        type: 'room',
        data: room,
        droppable: false,
        draggable: false
      };

      this.roomsNode.children.push(childNode);
    }

    this.nodes.push(this.roomsNode);

    return this.roomsNode;
  }

  private getActorsNode(): TreeNode {
    this.actorsNode = {
      selectable: true,
      label: 'Actors',
      type: 'actorsRoot',
      data: this.story,
      droppable: false,
      draggable: false,
      children: [],
      expanded: true
    };

    for (const act of this.story.actors) {

      const childNode: TreeNode = {
        label: act.key, // Or act.name, but this is maybe more concise
        leaf: true,
        type: 'actor',
        data: act,
        droppable: false,
        draggable: false
      };

      this.actorsNode.children.push(childNode);
    }

    this.nodes.push(this.actorsNode);

    return this.actorsNode;
  }

}