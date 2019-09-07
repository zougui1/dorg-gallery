import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

import FormDisplayer from './FormDisplayer';
import Loader from '../../../Partials/Loader';
import uploaderState from '../../../../store/states/uploader';
import socket from './socket';
import { Grid } from '@material-ui/core';

const mapStateToProps = mapDynamicState({
  misc: 'tags',
  auth: 'user',
});
const mapDispatchToProps = mapDynamicDispatch(uploaderState.actions, 'setFormView setImageData');

class Uploader extends React.Component {

  state = {
    error: '',

    loader: {
      loading: false,
      success: false,
      error: false,
      errorMessage: ''
    }
  }

  componentDidMount() {
    socket.On.imageUploaded(this.imageUploaded);
    socket.On.imageUploadFailed(this.imageUploadFailed);
  }


  componentWillUnmount() {
    socket.Remove.imageUploaded(this.imageUploaded);
    socket.Remove.imageUploadFailed(this.imageUploadFailed);
  }

  /**
   * is called when the user submit the form
   */
  submit = formData => {
    const { setImageData, setFormView, user } = this.props;

    this.setState({ loader: { loading: true } });

    this.transformFormData(formData)
      .then(formData => {
        // if the user want to draw an overlay we don't upload the image but display the
        // view to draw an overlay
        // other we upload the image
        if (formData.withOverlay) {
          setImageData(formData);
          setFormView('Overlay');
        } else {

          socket.Emit.uploadImage({
            ...formData,
            tags: formData.tags,
            user
          });
        }
      })
      .catch(err => {
        console.error(err);

        this.setState({ loader: { error: true, errorMessage: 'An error occured and your image couldn\'t be uploaded' } });
      });
  }

  /**
   * is used to transform the data from the form before we upload them
   * @param {Object} formData
   * @returns {Promise<Object>} data of the form ready to be send to the server
   */
  transformFormData = formData => new Promise(resolve => {

    const transformedFormData = { ...formData };

    if (transformedFormData.artistLink) {
      transformedFormData.artistLink = transformedFormData.artistLink.trim();
    }

    if (!/^https?:\/\//.test(formData.artistLink)) {
      transformedFormData.artistLink = 'http://' + transformedFormData.artistLink;
    }

    // we change the structure of the artist data
    // to match the model used in the database
    transformedFormData.artist = {
      name: formData.artistName,
      link: formData.artistLink,
    };

    // those 2 values or now useless so we delete them
    delete transformedFormData.artistName;
    delete transformedFormData.artistLink;

    const reader = new FileReader();

    // we want the image as a base64 string
    reader.readAsDataURL(transformedFormData.image);
    reader.addEventListener('load', () => {
      transformedFormData.image = formData.image;
      transformedFormData.imageBase64 = reader.result;

      resolve(transformedFormData);
    });
  });

  /**
   * is called if the upload succeeded
   */
  imageUploaded = () => {
    this.setState({ loader: { success: true } });
  }

  /**
   * is called if the upload failed
   * @param {Object} data from the server
   * @param {String} data.error error message
   */
  imageUploadFailed = data => {
    this.setState({ loader: { error: true, errorMessage: data.error } });
  }

  render() {
    const { loader, error } = this.state;

    return (
      <div className="Uploader d-flex justify-content-center text-center">

        <Grid container item xs={11} md={6} sm={9} className="d-flex flex-column align-items-center">
          <FormDisplayer onSubmit={this.submit} />

          <Loader {...loader} redirection="/" errorMessage={error || loader.errorMessage} successMessage="The image has been uploaded" />
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);
