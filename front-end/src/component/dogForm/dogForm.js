import React from 'react';
import PropTypes from 'prop-types';
import autoBind from './../../utils';

const defaultState = { title: '', error: null };

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
    event.preventDefault();
    this.setState({ title: event.target.value });
  }

  render() {
    return (
      <form
      onSubmit={this.handleSubmit}
      className="dog-form"
      >
      <input
      name="title"
      type="text"
      placeholder="Enter a dog title"
      value={this.state.title}
      onChange={this.handleChange}
      />
      <button type="submit">{this.props.buttonText}</button>
      </form>
    );
  }
}

DogForm.propTypes = {
  onComplete: PropTypes.fun,
  dog: PropTypes.object,
  buttonText: PropTypes.string,
};
