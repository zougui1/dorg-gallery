import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import EditableForm from '../../../Uploader/Forms/EditableFields';

const mapStateToProps = mapDynamicState('uploader: imageData');
const mapDispatchToProps = mapDynamicDispatch('uploader: imageData');

class Form extends React.Component {

  state = {
    title: '',
    artistLink: '',
    artistName: '',
    tags: '',
    rate: ''
  }

  componentDidMount() {
    this.updateState();
  }

  componentDidUpdate(prevProps) {
    const { imageData } = this.props;

    if (!_.isEqual(imageData.get(), prevProps.imageData.get())) {
      this.updateState();
    }
  }


  /**
   * update the state with the data stored in `imageData`
   */
  updateState = () => {
    const { imageData } = this.props;

    const newState = {
      ...imageData.get(),
      artistName: '',
      artistLink: '',
    };

    if (_.isObject(imageData.get())) {
      newState.artistName = imageData.get().artist.name;
      newState.artistLink = imageData.get().artist.link;
    }

    this.setState(newState);
  }

  /**
   * is called when the form has been submited and validated
   */
  submit = e => {
    const { imageData, onSubmit } = this.props;

    const formData = this.transformFormData(this.state);

    imageData.set(formData);
    onSubmit(e)
  }

  /**
   * is used to transform the data from the form before we upload them
   * @returns {Promise<Object>} data of the form ready to be send to the server
   */
  transformFormData = formData => {
    const newFormData = { ...formData };

    if (newFormData.artistLink) {
      newFormData.artistLink = newFormData.artistLink.trim();

      if (!/^https?:\/\//.test(newFormData.artistLink)) {
        newFormData.artistLink = 'http://' + newFormData.artistLink;
      }
    }

    newFormData.artist = {
      name: newFormData.artistName,
      link: newFormData.artistLink
    };

    // those 2 values or now useless so we delete them
    delete newFormData.artistName;
    delete newFormData.artistLink;

    return newFormData;
  }

  /**
   * give the form the possibility to edit the state
   */
  _setState = obj => this.setState(obj);

  render() {
    return (
      <EditableForm formData={this.state} changeFormData={this._setState} onSubmit={this.submit} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
