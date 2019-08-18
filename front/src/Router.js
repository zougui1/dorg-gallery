import React from 'react';
import { Route, Switch } from 'react-router-dom';

//import ProtectedRoute from './components/ProtectedRoute';

//import Home from './components/Pages/Home';
import Upload from './components/Pages/Upload';
import Signup from './components/Pages/Signup';
//import Login from './components/Pages/Login';
//import User from './components/Pages/User';
//import Image from './components/Pages/Image';
//import NotFound from './components/Pages/NotFound';


const Router = () => (
  <Switch>
    {/*<Route exact path="/" component={Home} />*/}
    <Route exact path="/upload" component={Upload} />
    <Route exact path="/signup" component={Signup} />
    {/*<Route exact path="/login" component={Login} />
    <Route exact path="/user/:username" component={User} />
    <Route exact path="/user/:username/:page" component={User} />
    <Route exact path="/image/:id" component={Image} />
    <Route exact component={NotFound} />*/}
  </Switch>
);

export default Router;
