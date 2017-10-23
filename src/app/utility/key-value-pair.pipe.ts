import { Pipe, PipeTransform } from '@angular/core';
import {KeyValuePair} from './key-value-pair';

@Pipe({
  name: 'kvp'
})
export class KeyValuePairPipe implements PipeTransform {

  transform(dictionary: any, args?: any): KeyValuePair[] {

    const results: KeyValuePair[] = [];

    for (const key in dictionary) {

      if (dictionary.hasOwnProperty(key)) {
        results.push(new KeyValuePair(key, dictionary[key]));
      }

    }

    return results;
  }

}
