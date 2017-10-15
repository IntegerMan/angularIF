import { Injectable } from '@angular/core';
import {CommandToken} from './command-token';
import {TokenClassification} from './token-classification.enum';
import {NaturalLanguageService} from './natural-language.service';
import {LanguageTerm} from './language-term';
import {LoggingService} from '../../logging.service';

@Injectable()
export class TokenizerService {

  constructor(private languageService: NaturalLanguageService,
              private logger: LoggingService) {

  }

  private static getTokenFromTerm(term) {
    const token: CommandToken = new CommandToken(term);
    token.classification = TokenizerService.getClassificationFromTerm(term);
    return token;
  }

  private static getClassificationFromTerm(term: LanguageTerm): TokenClassification {

    const classifications = Object.keys(TokenClassification);

    // Look for a best tag match
    for (const c of classifications) {
      const value: any = TokenClassification[c];

      if (value === term.bestTag) {
        return value;
      }
    }

    // Okay, now that we don't have a best tag match, we'll do an any tag match. This will match in enum order on the classification enum
    for (const c of classifications) {
      const value: any = TokenClassification[c];

      for (const tag of term.tags) {

        if (value === tag) {
          return value;
        }

      }

    }

    return TokenClassification.Unknown;
  }

  public getTokenForWord(word: string) {

    // Validate input
    if (!word || word.length  <= 0) {
      throw new Error('When interpreting a single word, that word must be present');
    }

    const terms: LanguageTerm[] = this.languageService.getTerms(word);

    return TokenizerService.getTokenFromTerm(terms[0]);
  }

  public getTokensForSentence(sentence: string): CommandToken[] {

    // Great test case: Open the door to the east with the bronze key from the bedroom.

    // Validate input
    if (!sentence || sentence.length  <= 0) {
      throw new Error('I\'m sorry. Did you say something?'); // Cutesy speak for I can't figure out what you're talking about
    }

    const terms: LanguageTerm[] = this.languageService.getTerms(sentence);

    const tokens: CommandToken[] = [];

    console.log('Parsing terms into tokens now...');
    for (const term of terms) {

      const token = TokenizerService.getTokenFromTerm(term);

      this.logger.log(token);
      tokens.push(token);

    }

    return tokens;
  }

}
