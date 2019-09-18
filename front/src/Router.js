import React from 'react';
import { Route, Switch } from 'react-router-dom';

import roles from './data/roles';
import ProtectedRoute from './components/Partials/ProtectedRoute';

import NotFound from './components/Pages/NotFound';
import { asynchronify } from './utils';

const home = () => import(/* webpackChunkName: "home" */ './components/Pages/Home');
const signup = () => import(/* webpackChunkName: "signup" */ './components/Pages/Signup');
const login = () => import(/* webpackChunkName: "login" */ './components/Pages/Login');
const gallery = () => import(/* webpackChunkName: "gallery" */ './components/Pages/Gallery');
const upload = () => import(/* webpackChunkName: "upload" */ './components/Pages/Upload');
const show = () => import(/* webpackChunkName: "show" */ './components/Pages/Show');
const profile = () => import(/* webpackChunkName: "profile" */ './components/Pages/Profile');

const Router = () => (
  <Switch>
    <Route exact path={['/', '/home']} component={asynchronify('home', home)} />
    <ProtectedRoute exact path="/upload" role={roles.user} component={asynchronify('upload', upload)} />
    <Route exact path="/signup" component={asynchronify('signup', signup)} />
    <Route exact path="/login" component={asynchronify('login', login)} />
    <Route exact path="/gallery/:user_slug/:page?" component={asynchronify('gallery', gallery)} />
    <Route exact path="/image/:id" component={asynchronify('show', show)} />
    <Route exact path="/profile" component={asynchronify('profile', profile)} />
    <Route exact component={NotFound} />
  </Switch>
);

export default Router;
