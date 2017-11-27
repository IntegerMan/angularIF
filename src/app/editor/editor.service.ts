import {LoggingService} from '../utility/logging.service';
import {NaturalLanguageService} from '../engine/parser/natural-language.service';
import {ItemData} from '../engine/story-data/item-data';
import {RoomData} from '../engine/story-data/room-data';
import {ActorData} from '../engine/story-data/actor-data';
import {StoryData} from '../engine/story-data/story-data';
import {EventEmitter, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddAliasDialogComponent} from './add-alias-dialog/add-alias-dialog.component';
import {AddEntityDialogComponent} from './add-entity-dialog/add-entity-dialog.component';
import {StoryLoader} from '../engine/story-data/story-loader';
import {AddAttributeDialogComponent} from './add-attribute-dialog/add-attribute-dialog.component';
import {AddVerbHandlerDialogComponent} from './verbs/add-verb-handler-dialog/add-verb-handler-dialog.component';
import {VerbData} from '../engine/story-data/verb-data';
import {EntityData} from '../engine/story-data/entity-data';
import {isNullOrUndefined} from 'util';
import {AddVerbResponseDialogComponent} from './verbs/add-verb-response-dialog/add-verb-response-dialog.component';
import {ArrayHelper} from '../utility/array-helper';

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

  public get canAddVerb(): boolean {
    return this.selectedNode && this.selectedNode.verbData;
  }

  public get canAddAlias(): boolean {
    return this.selectedNode && this.selectedNode.aliases;
  }

  public get canAddAttribute(): boolean {
    return this.selectedNode && this.selectedNode.attributes;
  }

  public get canAddEvent(): boolean {
    return this.selectedNode && this.selectedNode.events;
  }

  public get canAddObject(): boolean {
    return this.selectedNode && this.selectedNode.contents;
  }

  public get canAddRoom(): boolean {
    return true;
  }

  public get canAddActor(): boolean {
    return true;
  }

  canDelete(entity: EntityData): boolean {

    return entity &&
           entity.nodeType &&
           (entity.nodeType === 'entity' ||
            entity.nodeType === 'actor' ||
            entity.nodeType === 'room' ||
            entity.nodeType === 'verb');

  }

  public delete(entity: EntityData): void {

    // Validate that this is acceptable
    if  (!this.canDelete(entity)) {
      return;
    }

    // Do the delete
    switch (entity.nodeType) {
      case 'entity':
        if (entity.parent) {
          ArrayHelper.removeIfPresent(entity.parent.contents, entity);
        }
        break;

      case 'actor':
        ArrayHelper.removeIfPresent(this.storyData.actors, entity);
        break;

      case 'room':
        ArrayHelper.removeIfPresent(this.storyData.rooms, entity);
        break;

      case 'verb':
        if (entity.parent) {
          ArrayHelper.removeIfPresent(entity.parent.verbData, entity);
        }
        break;
    }

    // Navigate off of the current node and onto a better one
    if (entity.parent) {
      this.selectNode(entity.parent);
    } else {
      this.selectNode(this.storyData);
    }

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
      this.logger.error('could not add verb');
      this.logger.error(this.selectedNode);
      return;
    }

    if (!name || name === null) {

      const dialogRef = this.dialog.open(AddVerbHandlerDialogComponent, {
        width: '300px'
      });

      dialogRef.afterClosed().subscribe(result => {
        this.logger.debug(`The add verb dialog was closed with a result of ${result}`);
        if (result) {
          this.addVerb(result);
        }
      });

      return;
    }

    // Verify the verb doesn't already exist
    if (this.selectedNode.verbData.filter(v => v.name === name).length > 0) {
      // TODO: It'd be nice to throw a toast notification up here.
      return;
    }

    const verbData: VerbData = new VerbData();
    verbData.name = name;
    verbData.handler = [];

    this.selectedNode.verbData.push(verbData);
  }

  public addAlias(name: string = null, partOfSpeech: string = null): void {

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
          this.addAlias(result.name, result.partOfSpeech);
        }
      });

      return;
    }

    const isAdjective: boolean = partOfSpeech === 'adjective';

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

      const dialogRef = this.dialog.open(AddAttributeDialogComponent, {
        width: '300px',
        data: {name: name, value: value}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.logger.debug(`The add attribute dialog was closed with a result of ${result}`);
        if (result) {
          this.addAttribute(result.key, result.value);
        }
      });

      return;
    }
    this.selectedNode.attributes[name] = value;
  }

  addResponse(verb: VerbData, response: any = null): void {

    if (isNullOrUndefined(response)) {

      const dialogRef = this.dialog.open(AddVerbResponseDialogComponent, {
        width: '300px'
      });

      dialogRef.afterClosed().subscribe(result => {
        this.logger.debug(`The add verb response dialog was closed with a result of ${result}`);
        if (result) {
          this.addResponse(verb, result);
        }
      });

      return;
    }

    // Get it to the point where we can just stick our new content in there.
    if (!verb.handler) {
      verb.handler = [];
    } else if (!(verb.handler instanceof Array)) {
      verb.handler = [verb.handler];
    }

    verb.handler.push(response);
  }

  editResponse(verb: VerbData, item: any): void {

    // Translate from simple string to a more standard representation
    if (item && typeof (item) === 'string') {
      const newItem = {type: 'story', value: item};

      if (verb.handler instanceof Array) {
        ArrayHelper.replaceElement(verb.handler, item, newItem);
      } else {
        verb.handler = [newItem];
      }
      item = newItem;
    }

    const dialogRef = this.dialog.open(AddVerbResponseDialogComponent, {
      width: '300px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      this.logger.debug(`The edit verb response dialog was closed`);
      this.logger.debug(result);
      if (result) {

        if (!verb.handler || typeof(verb.handler) === 'string') {
          verb.handler = [result];
        } else {
          ArrayHelper.replaceElement(verb.handler, item, result);
        }
      }
    });
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

  editVerb(verb: VerbData, entity: EntityData) {

    if (!entity) {
      throw new Error('Entity was not defined');
    }

    // Set parent so we can navigate out via done and via the breadcrumbs
    (<any>verb).parent = entity;

    // Stick that bad boy into the navigation chain
    this.selectNode(verb, 'verbHandler');
  }

  deleteVerb(verb: VerbData, entity: EntityData) {

    // TODO: Prompt the user to confirm

  }

  private jsonFilter(name: string, value: any): any {

    // These properties are editor conveniences and should not be serialized.
    if (name === 'nodeType' || name === 'parent' || name === 'ids' || name === 'nav') {
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
