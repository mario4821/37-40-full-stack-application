import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../../action/auth';
import autoBind from '../../utils/index';
import AuthForm from '../auth-form/auth-form';
import * as routes from '../../utils/route';

class AuthLanding extends React.Component {
  constructor(props) {
    super(props);
    autoBind.call(this, AuthLanding);
  }

  handleLogin(user) {
    return this.props.pDoLogin(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      })
      .catch(console.error);
  }

  handleSignup(user) {
    return this.props.pDoSignup(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      })
      .catch(console.error);
  }

  render() {
    const signUpJSX = <div>
      <h2> SIGN UP! </h2>
      <p> Already have an account? </p>
      <Link to='/login'> Login to our app</Link>
      <AuthForm onComplete= {this.handleSignup} type="Signup"/>
    </div>;

    const loginJSX = <div>
      <h2> LOGIN HERE </h2>
      <p> Do not have an account? </p>
      <Link to='/signup'> Sign up with us!</Link>
      <AuthForm onComplete={ this.handleLogin} type='Login'/>
    </div>;

    const { location } = this.props;

    return (
      <div className='landing'>
        {location.pathname === routes.SIGNUP_ROUTE ? signUpJSX : undefined }
        {location.pathname === routes.LOGIN_ROUTE ? loginJSX : undefined }
      </div>
    );
  }
}

AuthLanding.propTypes = {
  pDoLogin: PropTypes.func,
  pDoSignup: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  token: state.token,
});


const mapDispatchToProps = dispatch => ({
  pDoSignup: user => dispatch(authActions.signupRequest(user)),
  pDoLogin: user => dispatch(authActions.loginRequest(user)),
});


export default connect(mapStateToProps, mapDispatchToProps)(AuthLanding);
