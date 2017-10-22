export class StringHelper {

  static toOxfordCommaList(items: string[], joiner: string = 'and'): string {

    if (!items || items.length <= 0) {
      return '';
    } else if (items.length === 1) {
      return items[0];
    } else if (items.length === 2) {
      return `${items[0]} ${joiner} ${items[1]}`;
    } else {
      return `${items.slice(0, -1).join(', ')}, ${joiner} ${items.slice(-1)}`;
    }

  }

  static capitalize(input: string): string {

    if (!input || input.length < 1) {
      return input;
    } else if (input.length === 1) {
      return input.charAt(0).toUpperCase();
    } else {
      return input.charAt(0).toUpperCase() + input.slice(1);
    }

  }

  /**
   * Replaces every instance of the search string in the input string with the replacement string. This is different than the replace
   * method which only replaces the first instance
   * @param {string} input The string to search and replace
   * @param {string} search The string to search input for.
   * @param {string} replacement The string to replace all instances of search in input with.
   * @param caseSensitive {boolean} Whether casing should be taken into account for the search. By default, this is true.
   * @returns {string} A modified version of input.
   */
  static replaceAll(input: string, search: string, replacement: string, caseSensitive: boolean = true): string {

    if (!input) {
      return null;
    }

    if (caseSensitive) {

      return input.split(search).join(replacement);

    } else {

      // Case insensitive search will replace all instances and sub in the replacement value (including its casing)
      let pos = input.toLowerCase().indexOf(search.toLowerCase());

      while (pos >= 0) {
        input = input.substr(0, pos) + replacement + input.substr(pos + search.length);
        pos = input.toLowerCase().indexOf(search.toLowerCase());
      }

      return input;

    }
  }

  static startsWithVowel(character: string): boolean {

    if (!character || character.length <= 0) {
      return false;
    }

    switch (character[0].toLowerCase()) {
      case 'a':
      case 'e':
      case 'i':
      case 'o':
      case 'u':
        return true;

      default:
        return false;
    }

  }

  static pluralize(count: number, singular: string, plural: string): string {

    if (count === 1) {
      return `1 ${singular}`;
    } else {
      return `${count} ${plural}`;
    }

  }

}
