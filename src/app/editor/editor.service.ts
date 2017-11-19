import { LoggingService } from '../utility/logging.service';
import { NaturalLanguageService } from '../engine/parser/natural-language.service';
import { ItemData } from '../engine/story-data/item-data';
import { RoomData } from '../engine/story-data/room-data';
import { ActorData } from '../engine/story-data/actor-data';
import { StoryData } from '../engine/story-data/story-data';
import {EventEmitter, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddAliasDialogComponent} from './add-alias-dialog/add-alias-dialog.component';
import {AddEntityDialogComponent} from './add-entity-dialog/add-entity-dialog.component';
import {StoryLoader} from '../engine/story-data/story-loader';
import {EntityData} from '../engine/story-data/entity-data';

@Injectable()
export class EditorService {

  public storyData: StoryData;
  public isPlaying: boolean = false;

  playRequested: EventEmitter<RoomData>;
  nodeSelected: EventEmitter<any>;

  selectedNode: any;

  private fileSaver: any;

  constructor(private nlpService: NaturalLanguageService,
              private logger: LoggingService,
              private dialog: MatDialog) {

    this.nodeSelected = new EventEmitter<any>();
    this.playRequested = new EventEmitter<RoomData>();
    this.selectedNode = null;

  }

  public saveToJSON(data: string = null): void {

    if (!data || data === null || data.length <= 0) {
      data = this.getJSON();
    }

    if (!this.fileSaver) {
      this.fileSaver = require('file-saver');
    }

    const blob: Blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
    this.fileSaver.saveAs(blob, `${this.storyData.name}.json`);
  }

  getJSON(): string {

    this.logger.log('Generating JSON data for story');

    // Serialize to JSON, stripping out editor properties in the process
    return JSON.stringify(this.storyData, this.jsonFilter);

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

  public get canAddRoom() {
    return true;
  }

  public get canAddActor() {
    return true;
  }

  public selectNode(node: any, nodeType: string = null) {

    this.logger.debug(`Selecting node`);
    this.logger.debug(node);

    if (node && nodeType && nodeType !== null && nodeType !== undefined && typeof(node) === 'object') {
      node.nodeType = nodeType;
    }

    this.selectedNode = node;
    this.nodeSelected.emit(node);

  }

  public addRoom(key: string = null, name: string = null): void {

    // Verify we can handle rooms
    if (!this.canAddRoom) {
      // TODO: It'd be nice to throw a toast notification up here.
      return;
    }

    if (!key || !name) {
      const method = this.addRoom;
      const entityType = 'Room';
      this.getNameAndKeyForNewEntity(entityType, method, key);

      return;
    }

    const room = new RoomData();
    room.key = key;
    room.name = name;
    room.nodeType = 'room';
    StoryLoader.ensureCommonDataFields(room);
    this.storyData.rooms.push(room);
    this.selectNode(room);
  }

  public addActor(key: string = null, name: string = null): void {

    // Verify we can handle children
    if (!this.canAddActor) {
      // TODO: It'd be nice to throw a toast notification up here.
      return;
    }

    if (!key || !name) {
      const method = this.addActor;
      const entityType = 'Actor';
      this.getNameAndKeyForNewEntity(entityType, method, key);

      return;
    }

    const actor = new ActorData();
    actor.key = key;
    actor.name = name;
    actor.isPlayer = false;
    actor.nodeType = 'actor';

    // TODO: If our current context is a room, it'd be nice to set that as the start location
    actor.startRoom = null;
    actor.parent = null;

    StoryLoader.ensureCommonDataFields(actor);
    this.storyData.actors.push(actor);
    this.selectNode(actor);
  }

  public addObject(key: string = null, name: string = null): void {
    // Verify we can handle children
    if (!this.canAddObject) {
      // TODO: It'd be nice to throw a toast notification up here.
      return;
    }

    // Prompt to enter a name / key
    if (!key || !name) {
      const method = this.addObject;
      const entityType = 'Object';

      if (!key && this.selectedNode && this.selectedNode.key) {
        key = `${this.selectedNode.key}_`;
      }

      this.getNameAndKeyForNewEntity(entityType, method, key);

      return;
    }

    const item = new ItemData();
    item.key = key;
    item.name = name;
    item.parent = this.selectedNode;
    item.nodeType = 'entity';

    StoryLoader.ensureCommonDataFields(item);
    this.selectedNode.contents.push(item);
    //  Selecting it turns out to not be a good UX: this.selectNode(item);
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

      const dialogRef = this.dialog.open(AddAliasDialogComponent, {
        width: '300px'
      });

      dialogRef.afterClosed().subscribe(result => {
        this.logger.debug(`The add alias dialog was closed with a result of ${result}`);
        if (result) {
          this.addAlias(result);
        }
      });

      return;
    }

    const isAdjective: boolean = this.nlpService.isTerm(name, 'Adjective');

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

  playStory(room: RoomData): void {
    this.isPlaying = true;
    this.playRequested.emit(room);
  }

  returnToEditor(node: any): void {
    this.isPlaying = false;

    if (node) {
      this.selectNode(node);
    }
  }

  private jsonFilter(name: string, value: any): any {

    // These properties are editor conveniences and should not be serialized.
    if (name === 'nodeType' || name === 'parent' || name === 'ids') {
      return undefined;
    }

    return value;
  }

  private getNameAndKeyForNewEntity(entityType: string,
                                    callback: (key?: string, name?: string) => void,
                                    key: string = '') {

    // Ensure we have proper context on callback
    if (callback) {
      callback = callback.bind(this);
    }

    const dialogRef = this.dialog.open(AddEntityDialogComponent, {
      width: '450px',
      data: {entityType: entityType, key: key, name: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.logger.debug(`The Add ${entityType} dialog was closed with a result of ${result}`);
      if (result && result.key && result.name && callback) {
        callback(result.key, result.name);
      }
    });
  }

}
