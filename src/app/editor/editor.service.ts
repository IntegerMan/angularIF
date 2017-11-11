import { NaturalLanguageService } from '../engine/parser/natural-language.service';
import { ItemData } from '../engine/story-data/item-data';
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

  constructor(private nlpService: NaturalLanguageService) {
    this.nodeSelected = new EventEmitter<any>();
    this.selectedNode = null;
  }

  public get canAddVerb() {
    return this.selectedNode && this.selectedNode.verbs;
  }

  public get canAddAlias() {
    return this.selectedNode && this.selectedNode.aliases;
  }

  public get canAddAttribute() {
    return this.selectedNode && this.selectedNode.attributes;
  }

  public get canAddEvent() {
    return this.selectedNode && this.selectedNode.events;
  }

  public get canAddObject() {
    return this.selectedNode && this.selectedNode.contents;
  }
 
  public selectNode(node: any, nodeType: string) {

    if (node && nodeType) {
      node.nodeType = nodeType;
    }

    this.selectedNode = node;
    this.nodeSelected.emit(node);

  }

  public addRoom(): void {
    const room = new RoomData();
    room.key = 'newRoom';
    room.name = 'New Room';
    this.configureNewEntity(room);
    
    this.storyData.rooms.push(room);
  }

  public addActor(): void {
    const actor = new ActorData();
    actor.key = 'newActor';
    actor.name = 'New Actor';
    actor.isPlayer = false;

    // TODO: If our current context is a room, it'd be nice to set that as the start location
    actor.startRoom = null;
    actor.parent = null;
    
    this.configureNewEntity(actor);
    
    this.storyData.actors.push(actor);
  }

  public addObject(): void {

    // Verify we can handle children
    if (!this.canAddObject) {
      // TODO: It'd be nice to throw a toast notification up here.
      return;
    }

    const item = new ItemData();
    item.key = 'newObject';
    item.name = 'New Object';
    item.parent = this.selectedNode;
    
    this.configureNewEntity(item);
    
    this.selectedNode.contents.push(item);
  }

  public addVerb(name: string = null): void {

    // Verify we can handle verbs
    if (!this.canAddVerb) {
      // TODO: It'd be nice to throw a toast notification up here.
      return;
    }

    if (!name || name === null) {
      // TODO: Pop up some UI to ask the user to get a verb name
      name = 'look';
    }

    // Verify the verb doesn't already exist
    if (this.selectedNode.verbs[name]) {
      // TODO: It'd be nice to throw a toast notification up here.
      return;      
    }

    this.selectedNode.verbs[name] = [];
  }

  public addAlias(name: string = null): void {

    // Verify we can handle aliases
    if (!this.canAddAlias) {
      // TODO: It'd be nice to throw a toast notification up here.
      return;
    }

    if (!name || name === null) {
      // TODO: Pop up some UI to ask the user to get an alias name
      return;
    }

    const isAdjective: boolean = this.nlpService.isTerm(name, 'adjective');

    if (isAdjective) {
      this.selectedNode.aliases.adjectives.push(name);
    } else {
      this.selectedNode.aliases.nouns.push(name);
    }
  }

  public addAttribute(name: string = null, value: any = null): void {

    // Verify we can handle attributes
    if (!this.canAddAttribute) {
      // TODO: It'd be nice to throw a toast notification up here.
      return;
    }

    if (!name || name === null) {
      // TODO: Pop up some UI to ask the user to get an attribute name and value
      return;
    }

    this.selectedNode.attributes[name] = value;
  }

  public addEvent(name: string = null): void {

    // Verify we can handle events
    if (!this.canAddEvent) {
      // TODO: It'd be nice to throw a toast notification up here.
      return;
    }

    if (!name || name === null) {
      // TODO: Pop up some UI to ask the user to get an attribute name and value
      return;
    }

    this.selectedNode.events[name] = [];
  }
 
  private configureNewEntity(entity: EntityData): void {

    entity.verbs = {};
    entity.attributes = {};
    entity.aliases = new AliasData();
    entity.contents = [];
    
  }

}
