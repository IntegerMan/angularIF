import { Injectable } from '@angular/core';
import {VerbHandler} from './verb-handler';
import {CloseHandler} from './close-handler';
import {OpenHandler} from './open-handler';
import {LookHandler} from './look-handler';
import {GoHandler} from './go-handler';
import {GetHandler} from './get-handler';
import {DropHandler} from './drop-handler';
import {ExamineHandler} from './examine-handler';
import {RestartHandler} from './restart-handler';
import {DieHandler} from './die-handler';
import {WinHandler} from './win-handler';
import {SaveHandler} from './save-handler';
import {LoadHandler} from './load-handler';
import {QuitHandler} from './quit-handler';
import {HangHandler} from './hang-handler';
import {PutHandler} from './put-handler';

@Injectable()
export class CommonVerbService {

  constructor() { }

  public getCommonVerbs(): VerbHandler[] {

    const verbs: VerbHandler[] = [];

    // TODO: It'd be real nice to have some automated way of getting synonyms within the engine
    verbs.push(new LookHandler(['look']));
    verbs.push(new ExamineHandler(['examine', 'inspect']));
    verbs.push(new GoHandler(['go', 'walk', 'run', 'travel']));
    verbs.push(new HangHandler(['hang', 'suspend', 'attach', 'affix'])); // TODO: Some of these should go in 'Put'
    verbs.push(new PutHandler(['put', 'set', 'deposit', 'store', 'stash', 'place']));
    verbs.push(new GetHandler(['get', 'take', 'procure', 'catch', 'grab', 'snatch', 'yoink']));
    verbs.push(new DropHandler(['drop', 'discard']));
    verbs.push(new OpenHandler(['open']));
    verbs.push(new CloseHandler(['close', 'shut']));
    verbs.push(new RestartHandler(['restart', 'reset']));
    verbs.push(new DieHandler(['die', 'forfeit', 'suicide']));
    verbs.push(new WinHandler(['win', 'cheat']));
    verbs.push(new SaveHandler(['save']));
    verbs.push(new LoadHandler(['load', 'restore']));
    verbs.push(new QuitHandler(['quit', 'menu']));

    return verbs;

  }
}
