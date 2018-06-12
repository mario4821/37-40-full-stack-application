import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as authActions from '../../action/auth';
import * as route from '../../utils/route';

class Header extends React.Component {
  render() {
    const JSXNotLoggedIn =
      <ul>
        <li><Link to={route.ROOT_ROUTE}> Home </Link></li>
        <li><Link to={route.LOGIN_ROUTE}> Login </Link></li>
        <li><Link to={route.SIGNUP_ROUTE}> Sign Up </Link></li>
    </ul>;
    const JSXLoggedIn =
      <ul>
        <li><Link to={route.DASHBOARD_ROUTE}> Dashboard </Link></li>
        <li><Link to={route.PROFILE_ROUTE}> Profile </Link></li>
      </ul>;

    return (
      <header className='header'>
        <nav>
          { this.props.loggedIn ? JSXLoggedIn : JSXNotLoggedIn }
        </nav>
        {
          this.props.loggedIn ?
            <button onClick={this.props.doLogout}>Logout</button>
            : undefined
        }
      </header>
    );
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
  doLogout: PropTypes.func,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token,
});


const mapDispatchToProps = dispatch => ({
  doLogout: () => dispatch(authActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
