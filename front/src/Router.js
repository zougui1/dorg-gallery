import React from 'react';
import { Route, Switch } from 'react-router-dom';

import roles from './data/roles';
import ProtectedRoute from './components/Partials/ProtectedRoute';

// default route
import NotFound from './components/Pages/NotFound';

import { asynchronify } from './utils';

// guest routes
const home = () => import(/* webpackChunkName: "home" */ './components/Pages/Home');
const signup = () => import(/* webpackChunkName: "signup" */ './components/Pages/Signup');
const login = () => import(/* webpackChunkName: "login" */ './components/Pages/Login');
const gallery = () => import(/* webpackChunkName: "gallery" */ './components/Pages/Gallery');
const show = () => import(/* webpackChunkName: "show" */ './components/Pages/Show');

// user routes
const upload = () => import(/* webpackChunkName: "upload" */ './components/Pages/Upload');
const profile = () => import(/* webpackChunkName: "profile" */ './components/Pages/Profile');

const Router = () => (
  <Switch>
    {/* guest routes */}
    <Route exact path={['/', '/home']} component={asynchronify('home', home)} />
    <Route exact path="/signup" component={asynchronify('signup', signup)} />
    <Route exact path="/login" component={asynchronify('login', login)} />
    <Route exact path="/gallery/:user_slug/:page?" component={asynchronify('gallery', gallery)} />
    <Route exact path="/image/:id" component={asynchronify('show', show)} />

    {/* user routes */}
    <ProtectedRoute exact path="/upload" role={roles.user} component={asynchronify('upload', upload)} />
    <ProtectedRoute exact path="/profile" role={roles.user} component={asynchronify('profile', profile)} />

    {/* default route */}
    <Route component={NotFound} />
  </Switch>
);

export default Router;
