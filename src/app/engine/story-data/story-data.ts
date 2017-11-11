import {RoomData} from './room-data';
import {ActorData} from './actor-data';

export class StoryData {

  // Basic Metadata
  name: string;
  version: string;
  icon: string;
  maxScore: number;
  authors: string;
  description: string;

  // These can be a string or it can be an array of interpretable objects
  introText: string | any[];

  /**
   * This is an array of unique IDs used in the story file. It's essentially a declaration area for YAML anchors, but it can be used to
   * check for ID uniqueness on load potentially.
   */
  ids: string[];

  rooms: RoomData[];
  actors: ActorData[];

  strings: any;

  // Editor Info
  nodeType: string;

}
