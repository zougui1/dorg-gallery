import React from 'react';
import _ from 'lodash';

class OverrideReactElement extends React.Component {

  /**
   * display a single children
   * @param {ReactElement} children
   * @returns {Function | Object}
   */
  getChildrenElement = children => {
    // if the component is a function, type will be a function
    // otherwise it will be an object with its type that would be a function
    if (_.isFunction(children.type)) {
      return children.type;
    } else if (_.isObject(children.type)) {
      return children.type.type;
    }
  }

  /**
   * create a unique key for a single children
   * @param {ReactElement} children
   * @param {Number} i
   * @returns {String}
   */
  getUniqueKey = (children, i) => {
    const { fileName, lineNumber } = children._source;

    return fileName + ':' + lineNumber + '-' + i;
  }

  /**
   * display a single children
   * @param {ReactElement} children
   * @param {Number} i
   * @returns {ReactElement}
   */
  singleChildren = (children, i) => {
    const { children: _, ...props } = this.props;

    const key = this.getUniqueKey(children, i);
    const Component = this.getChildrenElement(children);

    return <Component
      // restore its original props
      {...children.props}
      // add/override the original props
      {...props}
      // set a unique key
      key={key}
    />
  }

  /**
   * display the children
   * @returns {ReactElement[]}
   */
  overrideChildren = () => {
    const { children, index } = this.props

    // children can be an array
    // as well as it can be an object
    if (_.isArray(children)) {
      // the elements can be ReactElements as well
      // as they can be a simple string (in case of spaces)
      const childrens = children.filter(_.isObject);

      // if the user wants to override only a single element out of an array
      if (_.isSafeInteger(index)) {
        // override the current children only if the index match with the iteration
        return childrens.map((c, i) => i  === index ? this.singleChildren(c, i) : c);
      }

      return childrens.map(this.singleChildren);
    } else if (_.isObject(children)) {
      return this.singleChildren(children, 0);
    }

    return null;
  }

  render() {
    return this.overrideChildren();
  }
}

export default OverrideReactElement;
