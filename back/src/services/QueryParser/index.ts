import _ from 'lodash';
import { TagsParser } from './TagsParser';

export class QueryParser {

  tagsParser: TagsParser;
  query: any = {};

  /**
   *
   * @param {TagsParser} tagsParser
   * @public
   */
  constructor(tagsParser: TagsParser | string) {
    if (_.isString(tagsParser)) {
      this.tagsParser = new TagsParser(tagsParser);
    } else if (_.isObject(tagsParser)) {
      this.tagsParser = tagsParser;
    } else {
      this.tagsParser = new TagsParser('');
    }

    this.parse();
  }

  /**
   * @private
   */
  private parse() {
    this.setQueryFields();
  }

  /**
   * set the fields into the query
   * @private
   */
  private setQueryFields() {
    const { fields } = this.tagsParser;

    for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
        this.query[key] = {};
        this.includer(key);
        this.excluder(key);
      }
    }
  }

  /**
   * put the inclusions into the `$in` operator
   * @param {String} fieldName
   * @private
   */
  private includer(fieldName: string) {
    this.operatorSetter(fieldName, '$in', 'include');
  }

  /**
   * put the exclusions into the `$nin` operator
   * @param {String} fieldName
   * @private
   */
  private excluder(fieldName: string) {
    this.operatorSetter(fieldName, '$nin', 'exclude');
  }

  /**
   * set a value into a field with the specified operator in the query
   * @param {String} fieldName
   * @param {String} operator
   * @param {String} source
   * @private
   */
  private operatorSetter(fieldName: string, operator: string, source: string) {
    const sourceData = this.tagsParser.fields[fieldName][source];

    for (let i = 0; i < sourceData.length; i++) {
      const element: string = sourceData[i];
      const lastChar = element.length - 1;

      if (element[0] === '"' && element[lastChar] === '"') {
        sourceData[i] = element.substring(1, lastChar);
      }
    }

    this.query[fieldName][operator] = sourceData;
  }

}

let tags = `tag another-tag !something withSomethingElse !that-isn't-included`;
tags += ` !"just a phrase" "and another phrase"`;
tags += ` @field tags unique test !insult !gore "test phrase"`;
tags += ` @artistName name superName omg !ew`;

const tagsParser = new TagsParser(tags);

const parser = new QueryParser(tagsParser);

//console.log(JSON.stringify(parser.query, null, 2))
