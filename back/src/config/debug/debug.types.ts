import { Chalk } from 'chalk';
import { Debugger } from 'debug';


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
