import React from 'react';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import { mapDynamicState, mapDynamicDispatch } from 'dynamic-redux';

// TODO replace `TagsInput` with a textarea
import TagsInput from '../../../Partials/TagsInput';
import Loader from '../../../Partials/Loader';
import Field from '../../../Partials/Field';
import uploaderState from '../../../../store/states/uploader';
import { fields } from './fields';
import socket from './socket';

const mapStateToProps = mapDynamicState({
  misc: 'tags',
  auth: 'user',
});
const mapDispatchToProps = mapDynamicDispatch(uploaderState.actions, 'setFormView setImageData');

class Uploader extends React.Component {

  state = {
    formData: {
      artistName: '',
      artistLink: '',
      characterName: '',
      tags: [],
      withOverlay: false,
      isNsfw: false,
      image: null
    },

    tagsInputActive: false,
    error: '',

    loader: {
      loading: false,
      success: false,
      error: false,
      errorMessage: ''
    }
  }

  componentWillUnmount() {
    socket.Remove.imageUploaded(this.imageUploaded);
    socket.Remove.imageUploadFailed(this.imageUploadFailed);
  }

  /**
   * is called when the user select one file or more
   */
  handleFiles = e => {
    const files = e.target.files;

    this.setState({
      formData: {
        ...this.state.formData,
        image: files[0]
      }
    });
  }

  /**
   * is called when the user submit the form
   */
  submit = e => {
    e.preventDefault();
    const { setImageData, setFormView, user } = this.props;

    if (!this.validate()) {
      return;
    }

    this.setState({ loader: { loading: true } });

    this.transformFormData()
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
            tags: formData.tags.map(t => t.label),
            user
          });
          socket.On.imageUploaded(this.imageUploaded);
          socket.On.imageUploadFailed(this.imageUploadFailed);
        }
      })
      .catch(err => {
        console.error(err);

        this.setState({ loader: { error: true, errorMessage: 'An error occured and your image couldn\'t be uploaded' } });
      });
  }

  /** validate the form data
   * @returns {Boolean} true if the form is valid; otherwise false
   */
  validate = () => {
    const { tagsInputActive, formData } = this.state;

    // if the input to set the tags is active we don't want to submit the form
    if (tagsInputActive) {
      return false;
    }

    // the image is required
    if (!formData.image) {
      this.setState({ loader: { error: true, errorMessage: 'You must choose an image' } });
      return false;
    }

    if (formData.artistName.length > 60) {
      this.setState({ loader: { error: true, errorMessage: 'The artist name\'s length must be lower or equal to 60' } });
      return false;
    }

    if (formData.characterName.length > 60) {
      this.setState({ loader: { error: true, errorMessage: 'The character name\'s length must be lower or equal to 60' } });
      return false;
    }

    this.setState({ loader: {} });
    return true;
  }

  /**
   * is used to transform the data from the form before we upload them
   * @returns {Promise<Object>} data of the form ready to be send to the server
   */
  transformFormData = () => new Promise(resolve => {
    const { formData } = this.state;

    const transformedFormData = {
      ...formData,
      property: formData.isNsfw ? 'nsfw' : 'general',
    };

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

  /**
   * change the data inside the formData variable in the state
   * @param {Object} data
   */
  changeFormData = data => {
    this.setState({
      formData: {
        ...this.state.formData,
        ...data
      }
    });
  }

  /**
   * is called when the value of an input change
   */
  handleInputChange = e => {
    this.changeFormData({
      [e.target.name]: e.target.value
    });
  }

  /**
   * is called when the value of the 'tagsInput' field change
   * @param {Array}
   */
  handleTagsInputChange = tags => {
    this.changeFormData({ tags: tags });
  }

  /**
   * is called when the state of a checkbox change
   */
  handleCheckboxChange = e => {
    this.changeFormData({
      [e.target.name]: e.target.checked
    });
  }

  handleTagsInputFocus = () => this.setState({ tagsInputActive: true });
  handleTagsInputBlur = () => this.setState({ tagsInputActive: false });

  render() {
    const { formData, loader, error } = this.state;

    return (
      <div className="Uploader d-flex justify-content-center text-center">
        <form onSubmit={this.submit} className="d-flex justify-content-center flex-column">

          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleCheckboxChange}
                  checked={formData.withOverlay}
                  name="withOverlay"
                  id="withOverlay"
                />
              }
              label="Draw an overlay over the image?"
            />
          </FormGroup>

          {fields.map(field => (
            <FormGroup row key={field.name}>
              <Field
                name={field.name}
                label={field.label}
                type={field.type || 'text'}
                onChange={this.handleInputChange}
              />
            </FormGroup>
          ))}

          {
            // TODO replace `TagsInput` with a textarea
          }
          <FormGroup row>
            <TagsInput
              tagList={formData.tags}
              onChange={this.handleTagsInputChange}
              onFocus={this.handleTagsInputChange}
              onBlue={this.handleTagsInputChange}
            />
          </FormGroup>

          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleCheckboxChange}
                  checked={formData.isNsfw}
                  name="isNsfw"
                  id="isNsfw"
                />
              }
              label="NSFW"
            />
          </FormGroup>

          <FormGroup row className="d-flex justify-content-center">
            <input className="d-none" type="file" id="image" accept="image/*" onChange={this.handleFiles} />
            <label htmlFor="image">
              <Button variant="contained" component="span">
                Browse
              </Button>
            </label>
          </FormGroup>

          <FormGroup row className="d-flex justify-content-center mt-3">
            <Button color="primary" variant="contained" type="submit">
              submit
            </Button>
          </FormGroup>
          <FormGroup row className="d-flex justify-content-center mt-3">
            <Loader {...loader} redirection="/" errorMessage={error || loader.errorMessage} successMessage="The image has been uploaded" />
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);
