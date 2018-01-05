import {Component, Input, OnInit} from '@angular/core';
import {WorldEntity} from '../../engine/entities/world-entity';

@Component({
  selector: 'if-entity-debug',
  templateUrl: './entity-debug.component.html',
  styleUrls: ['./entity-debug.component.css']
})
export class EntityDebugComponent implements OnInit {

  @Input()
  entity: WorldEntity;

  contentNodes: any[];

  constructor() {
    this.contentNodes = [];
  }

  ngOnInit() {

    for (const child of this.entity.contents) {
      this.buildNodeForEntity(child, null);
    }

  }

  private buildNodeForEntity(entity: WorldEntity, parentNode: any): void {

    // Build the base node
    const node: any = {
      label: entity.that,
      data: entity,
      parent: parentNode,
      children: [],
      draggable: false,
      droppable: false,
      selectable: false,
      expanded: true,
      leaf: entity.contents.length <= 0
    };

    // Set to an appropriate document
    if (node.leaf) {
      node.icon = 'fa-file-text-o';
    } else {
      node.expandedIcon = 'fa-folder-open';
      node.collapsedIcon = 'fa-folder';
    }

    // Go recursive to build out child nodes
    for (const child of entity.contents) {
      this.buildNodeForEntity(child, node);
    }

    // Add it to its parent
    if (parentNode && parentNode !== null) {
      parentNode.children.push(node);
    } else {
      this.contentNodes.push(node);
    }

  }
}
