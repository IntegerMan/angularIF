import {CommandToken} from '../tokenizer/command-token';
import {Command} from '../tokenizer/command';
import {CommandContext} from '../command-context';

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

    // TODO: Key lookup would likely be better here

    // Match on supported verb normals
    for (const normal of this.registeredNormals) {
      if (normal === verbToken.name) {
        return true;
      }
    }

    // If we can't handle it, we can't handle it
    return false;
  }

  abstract handleCommand(command: Command, context: CommandContext): boolean;

}
