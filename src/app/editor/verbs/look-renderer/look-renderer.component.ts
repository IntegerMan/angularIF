import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {EntityData} from '../../../engine/story-data/entity-data';
import {VerbData} from '../../../engine/story-data/verb-data';

@Component({
  selector: 'if-look-renderer',
  templateUrl: './look-renderer.component.html',
  styleUrls: ['./look-renderer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LookRendererComponent implements OnInit, OnChanges {

  @Input()
  entity: EntityData;

  lookVerb: VerbData;

  constructor() { }

  ngOnInit() {
    this.updateLookVerb();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateLookVerb();
  }

  private updateLookVerb() {
    // A common case is wanting to know what the look description will be, so include that center stage
    const lookVerb = this.entity.verbData.filter(v => v.name === 'look');
    if (lookVerb && lookVerb.length > 0) {
      this.lookVerb = lookVerb[0];
    } else {
      this.lookVerb = undefined;
    }
  }


}
