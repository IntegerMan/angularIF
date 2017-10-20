import {Component, Input, OnInit} from '@angular/core';
import {CommandToken} from '../../engine/parser/command-token';
import {TokenClassification} from '../../engine/parser/token-classification.enum';

@Component({
  selector: 'if-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  @Input()
  token: CommandToken;

  @Input()
  includeModifiers: boolean = false;

  @Input()
  includeEntity: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  get cssClasses(): string {

    let output: string = `badge token-${this.token.classification.toString().toLowerCase()} `;

    switch (this.token.classification) {
      case TokenClassification.Verb:
        output += 'badge-danger ';
        break;

      case TokenClassification.Direction:
        output += 'badge-success ';
        break;

      case TokenClassification.Noun:
        output += 'badge-primary ';
        break;

      case TokenClassification.Adverb:
        output += 'badge-info ';
        break;

      case TokenClassification.Adjective:
        output += 'badge-info ';
        break;

      case TokenClassification.Ignorable:
      case TokenClassification.Determiner:
        output += 'badge-default ';
        break;

      case TokenClassification.Conjunction:
      case TokenClassification.Preposition:
        output += 'badge-secondary ';
        break;

      default:
        output += 'badge-warning '; // badge-dark works too
        break;
    }

    // Give it a rounded look if it is inferred
    if (this.token.isInferred) {
      output += 'inferred ';
    }

    // Modifiers should be rendered at a small level
    if (this.token.modifies) {
      output += 'small ';
    }

    return output;
  }

  get tooltip(): string {

    let tooltip = `${this.token.classification}: ${this.token.term.normal}`;

    if (this.token.isInferred) {
      tooltip += ' (Inferred)';
    }

    if (this.token.modifies) {
      tooltip += `\r\nModifies: ${this.token.modifies.name}`;
    }

    if (this.token.modifiedBy && this.token.modifiedBy.length > 0) {
      let modifiedByNames: string = '';
      for (const modifiedBy of this.token.modifiedBy) {
        modifiedByNames += modifiedBy.name + ' ';
      }

      tooltip += `\r\nModified by: ${modifiedByNames}`;
    }

    return tooltip;

  }
}
