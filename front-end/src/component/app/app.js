import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthRedirect from '../auth-redirect/auth-redirect';
import Dashboard from '../dashboard/dashboard';
import AuthLanding from '../auth-landing/auth-landing';
import Header from '../header/header';
import Profile from '../profile/profile';
import * as profileAction from '../../action/profileAction';

class App extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.fetchProfile()
        .catch(console.error);
    }
  }

  render() {
    return (
      <div className='app'>
      <h1>Pound Puppy Alert</h1>
        <BrowserRouter>
          <div>
            <Header/>
            <Route path='*' component={AuthRedirect}/>
            <Route exact path="/" component={AuthLanding}/>
            <Route exact path="/signup" component={AuthLanding}/>
            <Route exact path="/login" component={AuthLanding}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/profiles" component={Profile}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool,
  fetchProfile: PropTypes.func,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token,
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => dispatch(profileAction.profileFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
