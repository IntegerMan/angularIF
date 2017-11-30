import {Injectable} from '@angular/core';
import {ConfirmationService} from 'primeng/primeng';
import {InteractiveFictionEngine} from './interactive-fiction-engine';

@Injectable()
export class InteractiveFictionService {

  private _engine: InteractiveFictionEngine;

  constructor(private confirmService: ConfirmationService) {
    this._engine = new InteractiveFictionEngine(this.confirmService);
  }

  get engine(): InteractiveFictionEngine {
    return this._engine;
  }

}
