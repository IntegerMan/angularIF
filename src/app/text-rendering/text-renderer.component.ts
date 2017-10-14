import { Component, OnInit } from '@angular/core';
import {TextOutputService} from './text-output.service';
import {LoggingService} from '../logging.service';
import {TextLine} from './text-line';
import {CommandType} from './command-type.enum';
import {CommandToken} from '../engine/tokenizer/command-token';
import {TokenClassification} from '../engine/tokenizer/token-classification.enum';

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
    const tokens: CommandToken[] = line.data;

    let output: string =
      `<p class="my-2 text-secondary font-weight-bold">&gt;&nbsp;`;

    for (const token of tokens) {
      const term = token.term;
      const tooltip = `${token.classification}: ${token.term.normal}`;
      output += `${term.spaceBefore}<span ${this.getTokenStyling(token)} title="${tooltip}">${token.userInput}</span>${term.spaceAfter}`;
    }

    output += '</p>';

    return output;
  }

  private getTokenStyling(token: CommandToken): string {

    let output: string = `class="badge token-${token.classification.toString().toLowerCase()} `;

    switch (token.classification) {
      case TokenClassification.Verb:
        output += 'badge-danger';
        break;

      case TokenClassification.Direction:
        output += 'badge-success';
        break;

      case TokenClassification.Noun:
        output += 'badge-primary';
        break;

      case TokenClassification.Adjective:
      case TokenClassification.Adverb:
        output += 'badge-info';
        break;

      case TokenClassification.Determiner:
      case TokenClassification.Conjunction:
        output += 'badge-secondary';
        break;

      default:
        output += 'badge-default';
        break;
    }

    output += '"';

    return output;
  }

}
