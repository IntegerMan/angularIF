/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

// Allow us to read in JSON files as data
declare module '*.json' {
  const value: any;
  export default value;
}
