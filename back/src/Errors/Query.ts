import { BaseError } from './';

export class QueryError extends BaseError {

  /**
   * @api public
   * @param {String} message message of the error
   * @param {number} code code of the error
   * @param {number} stackTraceLimit the limit of entries in the stack trace
   * @returns {this} itself
   */
  public constructor(message: string, code: number = 0, stackTraceLimit: number = Error.stackTraceLimit) {
    super(message, QueryError, code, stackTraceLimit);

    return this;
  }
}
