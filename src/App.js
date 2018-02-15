import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Phone from './Page/Phone';
import Brand from './Page/Brand';

class App extends Component {


  render() {
      return (
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
      );

  }
}

export default App;
