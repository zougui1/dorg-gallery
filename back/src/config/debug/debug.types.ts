import { Chalk } from 'chalk';
import { Debugger } from 'debug';

export type NamespaceCreator = (namespaceName: string) => (name: string) => string;

namespace Dorg {
  export interface Debug {
    appName: string;
    chalk: Chalk;
    action: Debugger;
    http: Debugger;
    https: Debugger;
    mongoose: Debugger;
    socket: any;
  }
}

export { Dorg };
