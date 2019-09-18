import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.scss';

import store from './store';
import Navbar from './components/Globals/Navbar';
import Router from './Router';
import Auth from './services/Auth';

class Root extends React.Component {

  componentDidMount() {
    Auth.login();
  }

  render() {
   return (
      <Provider store={store}>
       <BrowserRouter>
         <React.Fragment>
           <Navbar />
           <Router />
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
