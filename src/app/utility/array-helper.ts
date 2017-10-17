export class ArrayHelper {

  static removeIfPresent(items: any[], item: any): boolean {

    const index: number = items.indexOf(item);
    if (index < 0) {
      return false;
    }

    items.splice(index, 1);

    return true;

  }

}
