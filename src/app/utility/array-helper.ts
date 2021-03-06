export class ArrayHelper {

  static removeIfPresent(items: any[], item: any): boolean {

    if (!items) {
      return false;
    }

    const index: number = items.indexOf(item);
    if (index < 0) {
      return false;
    }

    items.splice(index, 1);

    return true;

  }

  static replaceElement(items: any[], search: any, replacement: any): any[] {

    // Special case early exit if we're not actually changing things
    if (search === replacement) {
      return items;
    }

    const index: number = items.indexOf(search);
    if (index < 0) {
      return items;
    }

    // Swap out elements entirely
    items[index] = replacement;

    // Because we could have multiple instances, we'll go recursive
    return this.replaceElement(items, search, replacement);

  }

  static clone(arr: any[]): any[] {
    return arr.slice();
  }

  static contains(contents: any[], entity: any): boolean {
    return contents && contents.indexOf(entity) >= 0;
  }

}
