import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class EditorService {

  nodeSelected: EventEmitter<any>;

  selectedNode: any;

  constructor() {
    this.nodeSelected = new EventEmitter<any>();
    this.selectedNode = null;
  }

  selectNode(node: any, nodeType: string) {

    if (node && nodeType) {
      node.nodeType = nodeType;
    }

    this.selectedNode = node;
    this.nodeSelected.emit(node);

  }

}
