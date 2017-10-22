import {Scenery} from '../../engine/entities/scenery';
import {EntitySize} from '../../engine/entities/entity-size.enum';
import {EntityWeight} from '../../engine/entities/entity-weight.enum';
import {CommandContext} from '../../engine/command-context';

export class BarMessage extends Scenery {

  private hasExamined: boolean = false;

  constructor() {
    super('scrawled message');

    this.weight = EntityWeight.feather;
    this.size = EntitySize.backpack;

    this.addAdjectiveAliases(['written', 'dusty']);
    this.addNounAliases(['writing', 'sawdust', 'words', 'word', 'note', 'floor']);

  }

  getExamineDescription(context: CommandContext, isScrutinize: boolean): string {

    const count: number = context.state.getState(this.name, 0);
    if (count < 2) {

      if (!this.hasExamined) {
        this.hasExamined = true;
        context.score.increaseScore(1);
      }

      return 'The message, neatly marked in the sawdust, reads...';
    }  else {
      return 'The message has been carelessly trampled, making it difficult to read. You can just distinguish the words...';
    }

  }

}
