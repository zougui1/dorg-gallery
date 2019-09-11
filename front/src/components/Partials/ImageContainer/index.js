import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import OverrideReactElement from '../OverrideReactElement';

class ImageContainer extends React.Component {

  loadHandler = e => {
    const { onLoad } = this.props;

    console.log('loadHandler')
    const self = e.target;

    self.offsetParent.style.height = self.naturalHeight + 'px';
    self.offsetParent.style.width = self.naturalWidth + 'px';

    if (_.isFunction(onLoad)) {
      onLoad(e);
    }
  }

  /**
   * get the subcontainer if it is defined in the props, otherwise return `React.Fragment`
   * @returns {ReactElement}
   */
  getSubContainer = () => {
    const { subContainer } = this.props;

    if (_.isFunction(subContainer)) {
      return subContainer;
    }

    return React.Fragment;
  }

  render() {
    const { children, className } = this.props;

    const SubContainer = this.getSubContainer();

    return (
      <div className={classNames('image-container', className)}>
        <SubContainer>
          <OverrideReactElement onLoad={this.loadHandler}>
            {children}
          </OverrideReactElement>
        </SubContainer>
      </div>
    );
  }
}

export default ImageContainer;
