import React from 'react';
import { connect } from 'dynamic-redux';

import Loading from '../../Pages/Loading';

const mapStateToProps = 'router: cachedComponents';
const mapDispatchToProps = 'router: mergeCachedComponents';

// TODO replace this variable with a propert yin the redux store
// eslint-disable-next-line
let PreviousComponent;

class AsyncComponent extends React.PureComponent  {

  state = {
    Component: null
  }

  componentDidMount() {
    const { Component } = this.state;
    const { moduleProvider } = this.props;

    const cachedComponent = this.getComponent();

    if (cachedComponent) {
      this.setPreviousComponent(cachedComponent);
      this.setState({ Component: cachedComponent });
    } else if (!Component) {
      moduleProvider().then(this.componentSetter);
    }
  }

  /**
   * set the component into the redux store
   * @param {ReactComponent} Component
   */
  cacheComponent = Component => {
    const { name, mergeCachedComponents } = this.props;

    mergeCachedComponents({ [name]: Component });
  }

  /**
   * set `PreviousComponent` into the redux store
   * @param {ReactComponent} Component
   */
  setPreviousComponent = Component => {
    const { moduleProvider, name, ...props } = this.props;

    PreviousComponent = <Component {...props} />;
  }

  /**
   * get the demanded component if it exists in the store
   * @returns {ReactComponent | undefined}
   */
  getComponent = () => {
    const { name, cachedComponents } = this.props;

    return cachedComponents[name];
  }

  /**
   * set the component into the state and the store
   * @param {Object} data
   */
  componentSetter = data => {
    const exports = Object.values(data);
    const Component = exports[0];

    this.cacheComponent(Component);
    this.setPreviousComponent(Component);

    this.setState({ Component });
  }

  /**
   * render the current Component if it has finished to load
   * @returns {ReactElement}
   */
  renderComponentLoaded = () => {
    const { Component } = this.state;
    const { moduleProvider, name, ...props } = this.props;

    return <Component {...props} />;
  }

  /**
   * render the loading page until the demanded Component finish the load
   * @returns {ReactElement}
   */
  renderComponentLoading = () => {
    const { name } = this.props;

    return <Loading name={name} />;
  }

  render() {
    const { Component } = this.state;

    return (
      <div>
        {Component ? this.renderComponentLoaded() : this.renderComponentLoading()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsyncComponent);
