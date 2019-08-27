export abstract class BaseError extends Error {

  public code: number = 0;
  public info?: any;
  public stackTraceLimit: number;

  /**
   * @api public
   * @param {String} message message of the error
   * @param {Function} capturer the class that that create the error
   * @param {number} code code of the error
   * @param {number} stackTraceLimit the limit of entries in the stack trace
   * @returns {this} itself, making chaining possible
   */
  public constructor(message: string, capturer: Function, code: number, stackTraceLimit: number = Error.stackTraceLimit) {
    super(message);

    // save the default stack trace limit to reset it when the stack trace is captured
    const defaultStackTraceLimit = Error.stackTraceLimit;
    // change the stack trace limit
    Error.stackTraceLimit = stackTraceLimit;
    // set the prototype to allow this object and its childrens to implements custom methods
    Object.setPrototypeOf(this, capturer.prototype);
    // capture the stack trace without having this class to be in it
    Error.captureStackTrace(this, capturer);
    // reset the stack trace limit
    Error.stackTraceLimit = defaultStackTraceLimit;

    // set the name of the error to the name of the class
    this.name = this.constructor.name;
    this.stackTraceLimit = stackTraceLimit;
    this.code = code;

    return this;
  }

  /**
   * display the data of the error in the console without actually throwing an Exception
   * @api public
   * @param {Boolean} asJson whether or no to display the data as JSON
   * @returns {this} return itself
   */
  public dump(asJson: boolean = false): this {
    const dataToDisplay: any = {
      name: this.name,
      message: this.message,
      code: this.code,
    };

    if (this.info) {
      dataToDisplay.info = this.info;
    }

    if (asJson) {
      console.log(JSON.stringify(dataToDisplay, null, 2));
    } else {
      console.log(dataToDisplay);
    }

    return this;
  }

  /**
   * used to set additional info of the error
   * @api public
   * @param {any} info the additional info of the error
   * @returns {this} return itself
   */
  public setInfo(info: any): this {
    this.info = info;
    return this;
  }
}
