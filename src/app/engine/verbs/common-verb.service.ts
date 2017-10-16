import { Injectable } from '@angular/core';
import {VerbHandler} from './verb-handler';
import {CloseHandler} from './close-handler';
import {OpenHandler} from './open-handler';
import {LookHandler} from './look-handler';
import {GoHandler} from './go-handler';
import {GetHandler} from './get-handler';
import {DropHandler} from './drop-handler';

@Injectable()
export class CommonVerbService {

  constructor() { }

  public getCommonVerbs(): VerbHandler[] {

    const verbs: VerbHandler[] = [];

    // TODO: It'd be real nice to have some automated way of getting synonyms within the engine
    verbs.push(new LookHandler(['look', 'getExamineDescription', 'x', 'l']));
    verbs.push(new GoHandler(['go', 'walk', 'run', 'travel', 'head']));
    verbs.push(new GetHandler(['get', 'take', 'procure']));
    verbs.push(new DropHandler(['drop', 'discard']));
    verbs.push(new OpenHandler(['open']));
    verbs.push(new CloseHandler(['close', 'shut']));

    return verbs;

  }
}
