import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import LandingPage from './landing_page'
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import UserSignIn from './Components/user_signin';
import UserSignUp from './Components/user_signup';
import PrivateRoute from './Components/private_route';
import Dashboard from './Components/dashboard'


ReactDOM.render(
  <React.StrictMode>
  	<Router>
  	<Switch>
  	<Route path ="/" exact component={LandingPage}/>
    <Route path="/signup" exact component={UserSignUp}/>
    <Route path="/signin" exact component={UserSignIn}/>
    <PrivateRoute path='/dashboard' exact component={Dashboard}/>
    <Redirect to="/"/>

    

    </Switch>
  	</Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
