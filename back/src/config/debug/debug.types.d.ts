import { Chalk } from 'chalk';
import { Debugger } from 'debug';

export type NamespaceCreator = (namespaceName: string) => (name: string) => string;

export declare namespace Dorg {
  export interface Debug {
    appName: string;
    chalk: Chalk;
    action: Debugger;
    server: Debugger;
    mongoose: Debugger;
    cloudinary: Debugger;
    socket: any;
  }
}
