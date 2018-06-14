import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils';

const defaultState = {
  firstName: '',
  firstNameDirty: false,
  firstNameError: 'First Name Required',

  lastName: '',
  lastNameDirt: false,
  lastNameError: 'Last Name Required',

  phoneNumber: '',
  phoneNumberDirty: false,
  phoneNumberError: 'Phone Number Required',

  breed: '',
  age: '',

  location: '',
  locationDirty: false,
  locationError: 'Location Required',
};

const PHONE_NUMBER_LENGTH = 12;

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.profile ? props.profile : defaultState;
    autoBind.call(this, ProfileForm);
  }

  handleValidation(name, value) {
    switch (name) {
      case 'phoneNumber':
        if (value.length !== PHONE_NUMBER_LENGTH) {
          return 'Your phone number must include: \'+\', \'area code\', \'seven digit number, no dashes or parenthesis';
        }
        return null;
      default:
        return null;
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: this.handleValidation(name, value),
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.phoneNumberError) {
      this.setState({ phoneNumberDirty: true });
    } else {
      this.props.onComplete(this.state);
    }
  }

  render() {
    return (
      <form
        className='profile-form'
        onSubmit={this.handleSubmit}>
        <input
          name='firstName'
          placeholder='First Name'
          type='text'
          value={this.state.firstName}
          onChange={this.handleChange}
        />
        <input
        name='lastName'
        placeholder='Last Name'
        type='text'
        value={this.state.firstName}
        onChange={this.handleChange}
        />
        <input
        name='phoneNumber'
        placeholder='Phone Number'
        type='text'
        value={this.state.firstName}
        onChange={this.handleChange}
        />

  { this.state.phoneNumberDirty ? <p>{ this.state.phoneNumberError}</p> : undefined }

  <input
  name='breed'
  placeholder='Breed'
  type='text'
  value={this.state.firstName}
  onChange={this.handleChange}
  />
  <input
  name='location'
  placeholder='Zip Code'
  type='number'
  value={this.state.firstName}
  onChange={this.handleChange}
  />
  <input
  name='age'
  placeholder='Age'
  type='number'
  value={this.state.firstName}
  onChange={this.handleChange}
  />        

        <button type='submit'> {this.props.profile ? 'update' : 'create'} profile </button>
      </form>
    );
  }
}

ProfileForm.propTypes = {
  onComplete: PropTypes.func,
  profile: PropTypes.object,
};

export default ProfileForm;
