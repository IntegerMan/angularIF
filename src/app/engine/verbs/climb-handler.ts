import {GenericVerbHandler} from './generic-verb-handler';
import {VerbType} from './verb-type.enum';

export class ClimbHandler extends GenericVerbHandler {

  get verbType(): VerbType {
    return VerbType.go;
  }

}
