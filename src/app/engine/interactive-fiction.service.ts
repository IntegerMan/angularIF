import {Injectable} from '@angular/core';
import {InteractiveFictionEngine} from './interactive-fiction-engine';
import {ConfirmService} from '../common-ui/confirm.service';

@Injectable()
export class InteractiveFictionService {

  private _engine: InteractiveFictionEngine;

  constructor(private confirmService: ConfirmService) {
    this._engine = new InteractiveFictionEngine(this.confirmService);
  }

  get engine(): InteractiveFictionEngine {
    return this._engine;
  }

}
