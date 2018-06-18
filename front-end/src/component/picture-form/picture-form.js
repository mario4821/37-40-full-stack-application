import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/index';

const fileToBase64String = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('no file found'));

    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => resolve(fileReader.result));
    fileReader.addEventListener('error', reject);

    return fileReader.readAsDataURL(file);
  });
};

class PictureForm extends React.Component {
  constructor(props) {
    super(props);

    this.emptyState = {
      preview: undefined, // base-64 representation
      description: '',
    };

    this.state = this.emptyState;
    autoBind.call(this, PictureForm);
  }

  handleChange(event) {
    const { 
      type, name, value, files,
    } = event.target;

    if (type === 'file') {
      fileToBase64String(files[0])
        .then((result) => {
          this.setState({ 
            preview: result,
          });
        });
      this.setState({ picture: files[0] });
    } else {
      this.setState({ [name]: value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(this.emptyState);
  }

  render() {
    return (
      <form className="picture-form" onSubmit={this.handleSubmit}>
        <img src={this.state.preview}/>
        <label>Picture</label>
        <input
          name="picture"
          type="file"
          onChange={this.handleChange}
        />

        <label>Description</label>
        <input
          name="description"
          type="text"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <button type="submit">Upload picture</button>
      </form>
    );
  }
}

PictureForm.propTypes = {
  onComplete: PropTypes.func,
};

export default PictureForm;
