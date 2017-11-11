import { EntityData } from '../engine/story-data/entity-data';
import { RoomData } from '../engine/story-data/room-data';
import { AliasData } from '../engine/story-data/alias-data';
import { ActorData } from '../engine/story-data/actor-data';
import { StoryData } from '../engine/story-data/story-data';
import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class EditorService {

  storyData: StoryData;
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

  addRoom(): void {
    const room = new RoomData();
    room.key = 'newRoom';
    room.name = 'New Room';
    this.configureNewEntity(room);
    
    this.storyData.rooms.push(room);
  }

  addActor(): void {
    const actor = new ActorData();
    actor.key = 'newActor';
    actor.name = 'New Actor';
    actor.isPlayer = false;
    actor.startRoom = null;
    this.configureNewEntity(actor);
    
    this.storyData.actors.push(actor);
  }
 
  private configureNewEntity(entity: EntityData): void {

    entity.verbs = {};
    entity.attributes = {};
    entity.aliases = new AliasData();
    entity.contents = [];
    
  }

}
