export abstract class Story {

  title: string;
  author: string;
  version: string;

  constructor(title: string, author: string, version: string) {
    this.title = title;
    this.author = author;
    this.version = version;
  }
}
