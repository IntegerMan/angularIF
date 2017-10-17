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

}
