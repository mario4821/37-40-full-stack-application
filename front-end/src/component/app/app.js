import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AuthRedirect from '../auth-redirect/auth-redirect';
import Dashboard from '../dashboard/dashboard';
import AuthLanding from '../auth-landing/auth-landing';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
      <h1>Pound Puppy Alert</h1>
        <BrowserRouter>
          <div>
            <Route path='*' component={AuthRedirect}/>
            <Route exact path="/" component={AuthLanding}/>
            <Route exact path="/signup" component={AuthLanding}/>
            <Route exact path="/login" component={AuthLanding}/>
            <Route exact path="/dashboard" component={Dashboard}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
