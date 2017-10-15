import { Component, OnInit } from '@angular/core';
import {TextOutputService} from '../engine/text-output.service';
import {LoggingService} from '../logging.service';
import {TextLine} from './text-line';
import {CommandType} from './command-type.enum';
import {CommandToken} from '../engine/tokenizer/command-token';
import {TokenClassification} from '../engine/tokenizer/token-classification.enum';
import {Command} from '../engine/tokenizer/command';

@Component({
  selector: 'if-text-renderer',
  templateUrl: './text-renderer.component.html',
  styleUrls: ['./text-renderer.component.css']
})
export class TextRendererComponent implements OnInit {

  lines: TextLine[] = [];

  private _outputService: TextOutputService;
  private _logger: LoggingService;

  constructor(outputService: TextOutputService,
              logger: LoggingService) {
    this._outputService = outputService;
    this._logger = logger;
  }

  ngOnInit() {
    this._logger.log('TextRendererComponent initialized');
    this.lines = this._outputService.lines;
  }

  getHtmlForLine(line: TextLine): string {

    // TODO: This should really be moved into a service of some sort...

    let text: string = line.text;

    // Render direction tags
    text = text.split('{').join('<a class=\'text-info\' href="#">');
    text = text.split('}').join('</a>');

    // Render object tags
    text = text.split('[').join('<a class=\'text-secondary\' href="#">');
    text = text.split(']').join('</a>');

    switch (line.commandType) {

      case CommandType.engine:
        return `<span class="text-secondary">${text}</span>`;

      case CommandType.parserError:
        return `<span class="text-warning font-weight-bold">${text}</span>`;

      case CommandType.roomName:
        return `<p class="text my-4"><strong>${text}</strong></p>`;

      case CommandType.narrative:
        return `<span class="text">${text}</span>`;

      case CommandType.header:
        return `<span class="lead">${text}</span>`;

      case CommandType.subHeader:
        return `<span class="text-info">${text}</span>`;

      case CommandType.userInput:
        return `<p class="my-2 text-secondary font-weight-bold">&gt;&nbsp;<kbd>${text}</kbd></p>`;

      case CommandType.userInputDebug:
        return this.getInputDebuggingHtml(line);


      case CommandType.divider:
        return `<p class="my-3">${text}</p>`;

      default:
        return text;
    }

  }

  private getInputDebuggingHtml(line: TextLine): string {
    const command: Command = line.data;

    let output: string = `<div class="card mb-3"><div class="card-header">Sentence Structure</div>`;

    output += '<div class="card-body p-0 pt-3">';
    output += '<dl>';
    output += `<dt>Subject</dt><dd>${this.getTokenSpan(command.subject, true)}</dd>`;
    output += `<dt>Verb</dt><dd>${this.getTokenSpan(command.verb, true)}</dd>`;
    output += `<dt>Objects</dt><dd>${this.getTokenSpans(command.objects, true)}</dd>`;
    output += `<dt>Modifiers</dt><dd>${this.getTokenSpans(command.sentenceModifiers, true)}</dd>`;
    output += '</dl>';

    output += '</div>';

    output += `<div class="card-footer">All Tokens: ${this.getTokenSpans(command.tokens, false)}</div>`;
    output += '</div>';

    return output;
  }

  private getTokenSpans(tokens: CommandToken[], includeModifiers: boolean): string {

    // None is a valid input in some cases
    if (!tokens || tokens.length <= 0) {
      return '<span class="small text-muted">(None)</span>';
    }

    let output: string = '';

    for (const token of tokens) {
      const term = token.term;

      output += `${term.spaceBefore}${this.getTokenSpan(token, includeModifiers)}${term.spaceAfter}`;

    }

    return output;
  }

  private getTokenSpan(token: CommandToken, includeModifiers: boolean): string {

    if (!token) {
      return '<span class="small text-muted">(None)</span>';
    }

    const styling = this.getTokenStyling(token);
    const tooltip = this.getTokenTooltip(token);

    let output: string = '';

    // Include modifiers
    if (includeModifiers && token.modifiedBy && token.modifiedBy.length > 0) {
      output += this.getTokenSpans(token.modifiedBy, false);

      output += token.term.spaceBefore;
    }

    // Core span
    output += `<span ${styling} ${tooltip}>${token.name}</span>`;

    return output;

  }

  private getTokenStyling(token: CommandToken): string {

    let output: string = `class="badge token-${token.classification.toString().toLowerCase()} `;

    switch (token.classification) {
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
        output += 'badge-warning ';
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
        output += 'badge-dark ';
        break;
    }

    // Give it a rounded look if it is inferred
    if (token.isInferred) {
      output += 'inferred ';
    }

    // Modifiers should be rendered at a small level
    if (token.modifies) {
      output += 'small ';
    }

    output += '"';

    return output;
  }

  private getTokenTooltip(token: CommandToken): string {

    let tooltip = `${token.classification}: ${token.term.normal}`;

    if (token.isInferred) {
      tooltip += ' (Inferred)';
    }

    if (token.modifies) {
      tooltip += `\r\nModifies: ${token.modifies.name}`;
    }

    if (token.modifiedBy && token.modifiedBy.length > 0) {
      let modifiedByNames: string = '';
      for (const modifiedBy of token.modifiedBy) {
        modifiedByNames += modifiedBy.name + ' ';
      }

      tooltip += `\r\nModified by: ${modifiedByNames}`;
    }

    return `title="${tooltip}"`;

  }
}
