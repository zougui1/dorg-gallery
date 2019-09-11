import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mapDynamicDispatch } from 'dynamic-redux';

import './index.scss';

import store from './store';
import Navbar from './components/Globals/Navbar';
import Router from './Router';
import Auth from './services/Auth';
import socket from './socket/config';

const actions = mapDynamicDispatch('misc: tags')(store.dispatch);

class Root extends React.Component {

  componentDidMount() {
    Auth.login();

    socket.emit('getAllTags');
    socket.on('sendTags', data => {
      actions.tags.set(data.tags);
    });
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
