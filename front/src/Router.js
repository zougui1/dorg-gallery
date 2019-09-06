import React from 'react';
import { Route, Switch } from 'react-router-dom';

import roles from './data/roles';
import ProtectedRoute from './components/Partials/ProtectedRoute';

import Home from './components/Pages/Home';
import Upload from './components/Pages/Upload';
import Signup from './components/Pages/Signup';
import Login from './components/Pages/Login';
import Gallery from './components/Pages/Gallery';
import Show from './components/Pages/Show';
//import Image from './components/Pages/Image';
import NotFound from './components/Pages/NotFound';


const Router = () => (
  <Switch>
    <Route exact path={['/', '/home']} component={Home} />
    <ProtectedRoute exact path="/upload" role={roles.user} component={Upload} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/gallery/:user_slug/:page?" component={Gallery} />
    <Route exact path="/image/:id" component={Show} />
    {/*<Route exact path="/gallery/:user_slug/:page" component={Gallery} />*/}
    {/*<Route exact path="/user/:username" component={User} />
    <Route exact path="/user/:username/:page" component={User} />
    <Route exact path="/image/:id" component={Image} />*/}
    <Route exact component={NotFound} />
  </Switch>
);

export default Router;
