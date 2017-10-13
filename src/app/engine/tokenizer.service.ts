import { Injectable } from '@angular/core';
import {CommandToken} from './command-token';
import {TokenClassification} from './token-classification.enum';

@Injectable()
export class TokenizerService {

  constructor() { }

  public getTokensForSentence(sentence: string): CommandToken[] {
    if (!sentence || sentence.length  <= 0) {
      throw new Error('I\'m sorry. Did you say something?'); // Cutesy speak for I can't figure out what you're talking about
    }

    const words: string[] = sentence.split(' ');
    const tokens: CommandToken[] = [];

    for (const word of words) {
      tokens.push(this.getToken(word));
    }

    return tokens;
  }

  public getToken(word: string): CommandToken {

    if (!word || word.length  <= 0) {
      throw new Error('Cannot get a token for an empty word');
    }

    if (word.indexOf(' ') >= 0) {
      throw new Error('Cannot get a single token for multiple words');
    }

    const token: CommandToken = new CommandToken();

    token.userInput = word;
    token.name = word.toLowerCase();
    token.classification = TokenClassification.unknown;

    return token;
  }

}
