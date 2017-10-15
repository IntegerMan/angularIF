import {CommandToken} from '../tokenizer/command-token';

export abstract class VerbHandler {


  constructor(normals: string[]) {

    if (!normals || normals.length <= 0) {
      throw new Error('A verb alias is required');
    }

    this.registeredNormals = [];

    for (const normal of normals) {
      this.registeredNormals.push(normal);
    }

  }

  registeredNormals: string[];

  get name(): string {

    if (this.registeredNormals.length > 0) {
      return this.registeredNormals[0];
    }

    return typeof(this).name;

  }

  canHandleVerb(verbToken: CommandToken): boolean {
    return false;
  }

}
