import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import Phone from './Components/Phone';
import Brand from './Components/Brand';
import store from './Store/MyStore'




//store.dispatch({type: 'SET_PHONES', phones : [ {'name' : 'test'} ]})


class App extends Component {


  render() {
      return (
          <Provider store={store}>
              <Router>
                  <div>
                      <h2>Menu</h2>
                      <ul>
                          <li><Link to={'/phones'}>Phones</Link></li>
                          <li><Link to={'/brands'}>Brands</Link></li>
                      </ul>
                      <hr />

                      <Switch>
                          <Route exact path='/brands' component={Brand} />
                          <Route exact path='/phones' component={Phone} />
                      </Switch>
                  </div>
              </Router>
          </Provider>
      );

  }
}


export default App;
