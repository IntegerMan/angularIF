import { Pipe, PipeTransform } from '@angular/core';
import {EntityData} from '../engine/story-data/entity-data';

@Pipe({
  name: 'entitySort'
})
export class EntitySortPipe implements PipeTransform {

  transform(value: EntityData[], args?: any): EntityData[] {
    if (value) {

      value.sort((a: EntityData, b: EntityData) => {
        if (a.key < b.key) {
          return -1;
        } else if (a.key > b.key) {
          return 1;
        } else {
          return 0;
        }
      });

    }

    return value;
  }

}
