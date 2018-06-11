import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as route from '../../utils/route';

class AuthRedirect extends React.Component {
  render() {
    const { location, token } = this.props;
    const { pathname } = location;

    let destinationRoute = null;

    if (pathname === route.LOGIN_ROUTE || pathname === route.SIGNUP_ROUTE ||
    pathname === route.ROOT_ROUTE) {
      if (token) {
        destinationRoute = route.DASHBOARD_ROUTE;
      } 
    } else if (!token) { 
      destinationRoute = route.ROOT_ROUTE;
    }
   
    return (
      <div>
        { destinationRoute ? <Redirect to={destinationRoute}/> : undefined }
      </div>
    );
  }
}

AuthRedirect.propTypes = {
  token: PropTypes.string,
  location: PropTypes.object,
};

const mapStateToProps = state => ({
  token: state.token,
});

export default connect(mapStateToProps)(AuthRedirect);
