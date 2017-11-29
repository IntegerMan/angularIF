export class TextTemplateProvider {

  private static _instance: TextTemplateProvider;

  private templateEngine: any;

  static get instance(): TextTemplateProvider {
    if (!this._instance) {
      this._instance = new TextTemplateProvider();
    }
    return this._instance;
  }

  constructor() {
    this.templateEngine = require('mustache');
  }

  render(input: string, data: any): string {
    return this.templateEngine.render(input, data);
  }
}
