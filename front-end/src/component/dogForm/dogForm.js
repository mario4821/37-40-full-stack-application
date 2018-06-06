import React from 'react';
import PropTypes from 'prop-types';
import autoBind from './../../utils';

const defaultState = {
  firstName: '',
  age: '',
  breed: '',
  details: '',
  location: '',
  error: null,
};

export default class DogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.dog ? props.dog : defaultState;
    autoBind.call(this, DogForm);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.dog !== this.props.dog) {
      this.setState(this.props.dog);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onComplete } = this.props;
    const result = onComplete(this.state);
    if (result instanceof Promise) {
      result
        .then(() => {
          this.setState(defaultState);
        })
        .catch((error) => {
          console.error('DOG FORM ERROR: ', error);
          this.setState({ error });
        });
    }
  }

  handleChange(event) {
    const { name, value } =
    event.preventDefault();
    this.setState({ [name]: value });
  }

  render() {
    const { buttonText } = this.props;
    return (
      <form
      onSubmit={this.handleSubmit}
      className="dog-form"
      >
      <input
      name="firstName"
      type="text"
      placeholder="Enter a dog name"
      value={this.state.firstName}
      onChange={this.handleChange}
      />
      <input
      type="text"
      name="breed"
      placeholder="Dog Breed"
      value={this.state.breed}
      onChange={this.handleChange}
      />
      <input
      type="number"
      name="age"
      placeholder="Dog Age"
      value={this.state.age}
      onChange={this.handleChange}
      />
      <input
      type="text"
      name="location"
      placeholder="Zip location"
      value={this.state.location}
      onChange={this.handleChange}
      />
      <textarea
      type="text"
      name="details"
      placeholder="Details"
      value={this.state.details}
      onChange={this.handleChange}
      />
      <button type="submit">{buttonText}</button>
      </form>
    );
  }
}

DogForm.propTypes = {
  onComplete: PropTypes.fun,
  dog: PropTypes.object,
  buttonText: PropTypes.string,
};
