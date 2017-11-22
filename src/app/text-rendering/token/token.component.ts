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
        break;

      case TokenClassification.Adverb:
        output += 'light-blue ';
        break;

      case TokenClassification.Adjective:
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
    if (this.token.modifies && this.token.modifies.length > 0 && this.autoSize) {
      output += 'small-text ';
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

    if (this.token.modifies && this.token.modifies.length > 0) {
      tooltip += `\r\nModifies: ${this.getCommaSeparatedNamesOfModifierTokens(this.token.modifies)}`;
    }

    if (this.token.modifiedBy && this.token.modifiedBy.length > 0) {
      tooltip += `\r\nModified by: ${this.getCommaSeparatedNamesOfModifierTokens(this.token.modifiedBy)}`;
    }

    return tooltip;

  }

  private getCommaSeparatedNamesOfModifierTokens(collection: CommandToken[]): string {
    let names: string = '';
    for (const m of collection) {
      names += m.name + ' ';
    }
    return names;
  }
}
