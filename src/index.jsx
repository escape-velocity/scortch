// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Nav from './Nav.jsx'
import Games from './Games.jsx'
import Dashboard from './Dashboard.jsx'

import { Router, Route, hashHistory} from 'react-router';


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/games/:id" component={Games} />
    <Route path="/Nav" component={Nav} />
    <Route path="/dashboard" component={Dashboard} />
  </Router>), document.getElementById('react-root')
);
