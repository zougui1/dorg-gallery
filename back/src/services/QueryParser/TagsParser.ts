import _ from 'lodash';

export class TagsParser {

  excluders: string[] = ['!', '-'];
  fields: any = {};

  /**
   *
   * @param {String} tags
   * @public
   */
  constructor(tags: string) {
    //this.getPhrase(tags);
    this.mainParser(tags);
  }

  /**
   *
   * @param {String} tags
   * @private
   */
  private mainParser(tags: string): void {
    tags = '@keywords ' + tags;
    tags = this.multipleFieldsParser(tags);
  }

  /**
   * get the number of phrases
   * @param {String} tags
   * @returns {Number}
   * @private
   */
  private getPhrasesCount(tags: string) {
    const matches = tags.match(/"/g);
    let phrasesCount = 0;

    if (matches) {
      phrasesCount = matches.length;
    }

    return phrasesCount / 2;
  }


  /**
   * get multiple phrases
   * @param {String} tags
   * @returns {Object}
   * @private
   */
  private getMultiplePhrases(tags: string) {
    const phrasesCount = this.getPhrasesCount(tags);
    const returnValue: any = {
      phrases: [],
      tags: tags
    };


    for (let i = 0; i < phrasesCount; i++) {
      const { phrase, tags: _tags } = this.getPhrase(returnValue.tags);

      returnValue.phrases.push(phrase);
      returnValue.tags = _tags;
    }

    return returnValue;
  }


  /**
   * get a single phrase
   * @param {String} tags
   * @returns {String}
   * @private
   */
  private getPhrase(tags: string) {
    const lastQuotes = tags.lastIndexOf('"');
    const subStr = tags.substring(0, lastQuotes);
    const lastQuotes2 = subStr.lastIndexOf('"');
    let phrase = subStr.substring(lastQuotes2 + 1, subStr.length);
    phrase = `"${phrase}"`;

    if (_.includes(this.excluders, subStr[lastQuotes2 - 1])) {
      phrase = this.excluders[0] + phrase;
    }

    tags = tags.substring(0, tags.length - phrase.length - 1);

    return { phrase, tags };
  }

  /**
   * parse an array of string
   * @param {String[]} tags
   * @param {Object} objectContainer
   * @private
   */
  private parser(tags: string[], objectContainer: any): void {
    tags.forEach(tag => {
      tag = tag.trim();

      if (_.includes(this.excluders, tag[0])) {
        this.excludeParser(tag, objectContainer);
      } else {
        this.includeParser(tag, objectContainer);
      }
    });
  }

  /**
   * get the count of fields target tag
   * @param {String} tags
   * @returns {Number}
   * @private
   */
  private getFieldsCount(tags: string): number {
    const matches = tags.match(/@/g);
    let fieldsCount = 0;

    if (matches) {
      fieldsCount = matches.length;
    }

    return fieldsCount;
  }

  /**
   * parse multiple fields target tag
   * @param {String} tags
   * @returns {String}
   * @private
   */
  private multipleFieldsParser(tags: string): string {
    const fieldsCount = this.getFieldsCount(tags);

    for (let i = 0; i < fieldsCount; i++) {
      tags = this.fieldParser(tags);
    }

    return tags;
  }

  /**
   * parse a single field target tag
   * @param {String} tags
   * @returns {String}
   * @private
   */
  private fieldParser(tags: string): string {
    const fieldIndex = tags.lastIndexOf('@');
    const subStr = tags.substring(fieldIndex + 1, tags.length);
    const fieldTags = subStr.trim().split(' ');
    const fieldName = fieldTags.shift();

    if (fieldName) {
      this.fields[fieldName] = {
        include: [],
        exclude: [],
      };

      const { phrases, tags: newTags } = this.getMultiplePhrases(fieldTags.join(' '));

      this.parser([...newTags.split(' '), ...phrases], this.fields[fieldName]);
    }

    return tags.substring(0, fieldIndex);
  }

  /**
   * remove the first char of a string
   * @param {String} tags
   * @returns {String}
   * @private
   */
  private removeFirstChar (str: string): string {
    return str.substring(1, str.length);
  }

  /**
   * set a tag into an exclusion
   * @param {String} tags
   * @param {Object} objectContainer
   * @returns {String}
   * @private
   */
  private excludeParser(tag: string, objectContainer: any): void {
    tag = this.removeFirstChar(tag);
    objectContainer.exclude.push(tag);
  }

  /**
   * set a tag into an inclusion
   * @param {String} tags
   * @param {Object} objectContainer
   * @returns {String}
   * @private
   */
  private includeParser(tag: string, objectContainer: any): void {
    objectContainer.include.push(tag);
  }

}

let tags = `tag another-tag !something withSomethingElse !that-isn't-included`;
tags += ` !"just a phrase" "and another phrase"`;
tags += ` @field tags unique test !insult !gore "test phrase"`;
tags += ` @artistName name superName omg !ew`;

//console.log(tags)

//const parser = new TagsParser(tags);
//console.log(JSON.stringify(parser.fields, null, 2));
