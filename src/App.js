import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import Phone from './components/Phone';
import Brand from './components/Brand';
import Login from './components/Login';
import Menu from './components/Menu';
import store from './store/MyStore';
import logo from './logo.svg';
import './App.css';
import './index.css';

import AuthService from './components/AuthService';



//store.dispatch({type: 'SET_PHONES', phones : [ {'name' : 'test'} ]})


class App extends Component {

    constructor(){
        super();

    }




    render() {



        return (
          <Provider store={store}>

              <div className="App">
                  <header className="App-header">
                      <img src={logo} className="App-logo" alt="logo" />
                      <h1 className="App-title">KaruPhone</h1>
                  </header>
                  <div className="container">


                  <Router>
                      <div  className="row col-md-12 padding-20">
                          <Menu />


                          <Switch>
                              <Route exact path='/' component={Login} />
                              <Route exact path='/brands' component={Brand} />
                              <Route exact path='/phones' component={Phone} />
                          </Switch>

                      </div>
                  </Router>

                  </div>

              </div>
          </Provider>
      );

  }
}


export default App;
