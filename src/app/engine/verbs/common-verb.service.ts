import { Injectable } from '@angular/core';
import {VerbHandler} from './verb-handler';
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
import {DebugHandler} from './debug-handler';
import {WaitHandler} from './wait-handler';
import {ReportbugHandler} from './reportbug-handler';
import {GenericVerbHandler} from './generic-verb-handler';
import {VerbType} from './verb-type.enum';

@Injectable()
export class CommonVerbService {

  constructor() { }

  public getCommonVerbs(): VerbHandler[] {

    const verbs: VerbHandler[] = [];

    // TODO: It'd be real nice to have some automated way of getting synonyms within the engine
    verbs.push(new LookHandler(['look']));
    verbs.push(new ExamineHandler(['examine', 'inspect']));
    verbs.push(new GoHandler(['go', 'walk', 'run', 'travel', 'exit', 'saunter', 'stroll', 'sprint']));
    verbs.push(new HangHandler(['hang', 'suspend', 'attach', 'affix']));
    verbs.push(new PutHandler(['put', 'set', 'deposit', 'store', 'stash', 'place']));
    verbs.push(new GetHandler(['get', 'take', 'procure', 'catch', 'grab', 'snatch', 'yoink']));
    verbs.push(new DropHandler(['drop', 'discard']));

    // Generic Verbs
    verbs.push(new GenericVerbHandler('push', VerbType.manipulate, ['push', 'shove', 'move']));
    verbs.push(new GenericVerbHandler('pull', VerbType.manipulate, ['haul', 'tug']));
    verbs.push(new GenericVerbHandler('cut',
      VerbType.manipulate,
      ['chop', 'slice', 'skewer', 'bisect', 'impale'],
      `There are more pressing matters to attend to at the moment besides cutting things at random.`));
    verbs.push(new GenericVerbHandler('mow',
      VerbType.manipulate,
      ['harvest', 'reap'],
      `If you wanted to mow, you probably should have done it before there were more pressing things to attend to.`));

    // We'll want these to be more specific later, certainly.
    verbs.push(new GenericVerbHandler('open', VerbType.manipulate, ['open']));
    verbs.push(new GenericVerbHandler('close', VerbType.manipulate, ['close', 'shut']));

    verbs.push(new DebugHandler(['debug']));
    verbs.push(new WaitHandler(['wait', 'delay', 'lurk', 'loiter', 'watch']));
    verbs.push(new RestartHandler(['restart', 'reset']));
    verbs.push(new ReportbugHandler(['reportbug']));
    verbs.push(new DieHandler(['die', 'forfeit', 'suicide']));
    verbs.push(new WinHandler(['win', 'cheat']));
    verbs.push(new SaveHandler(['save']));
    verbs.push(new LoadHandler(['load', 'restore']));
    verbs.push(new QuitHandler(['quit', 'menu']));

    return verbs;

  }
}
