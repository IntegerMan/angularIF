import {Component, Input, OnInit} from '@angular/core';
import {WorldEntity} from '../../engine/entities/world-entity';
import {TreeNode} from '../../../assets/primeng/components/common/treenode';

@Component({
  selector: 'if-entity-debug',
  templateUrl: './entity-debug.component.html',
  styleUrls: ['./entity-debug.component.css']
})
export class EntityDebugComponent implements OnInit {

  @Input()
  entity: WorldEntity;

  contentNodes: TreeNode[];

  constructor() {
    this.contentNodes = [];
  }

  ngOnInit() {

    for (const child of this.entity.contents) {
      this.buildNodeForEntity(child, null);
    }

  }

  private buildNodeForEntity(entity: WorldEntity, parentNode: TreeNode): void {

    // Build the base node
    const node: TreeNode = {
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
