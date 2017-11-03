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

  @Input()
  autoSize: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  get cssClasses(): string {

    let output: string = `chip white-text token-${this.token.classification.toString().toLowerCase()} z-depth-1 `;

    switch (this.token.classification) {
      case TokenClassification.Verb:
        output += 'red lighten-1 ';
        break;

      case TokenClassification.Direction:
        output += 'green ';
        break;

      case TokenClassification.Noun:
        output += 'blue ';
        break;

      case TokenClassification.Adverb:
        output += 'light-blue ';
        break;

      case TokenClassification.Adjective:
        output += 'light-blue ';
        break;

      case TokenClassification.Ignorable:
      case TokenClassification.Determiner:
        output += 'blue-grey ';
        break;

      case TokenClassification.Conjunction:
      case TokenClassification.Preposition:
        output += 'grey ';
        break;

      default:
        output += 'warn-bg ';
        break;
    }

    // Give it a rounded look if it is inferred
    if (this.token.isInferred) {
      output += 'inferred ';
    }

    // Modifiers should be rendered at a small level
    if (this.token.modifies && this.autoSize) {
      output += 'small ';
    }

    return output;
  }

  get tooltip(): string {

    if (!this.token) {
      return null;
    }

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
