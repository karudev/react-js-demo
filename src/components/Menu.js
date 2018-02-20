import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import AuthService from './AuthService';



class Menu extends Component {

    constructor(props){
        super(props);
        this.state = {
            connected : false

        };

        this.logout = this.logout.bind(this);
        this.authService = new AuthService();

    }

    logout(e){
        e.preventDefault();
        this.authService.logout();
        this.setState({connected : false});

    }
    componentDidMount(){
        this.setState({connected : this.authService.isConnected()});
    }


  render() {
      console.log(this.authService.isConnected());
      let user = this.authService.getUser();

      if(!this.state.connected){
          return(<Redirect to={"/"} />);
      }else {


          return (
              <div className="row col-md-12">
                  <div className="col-md-6 text-right no-padding">
                      <Link to={'/phones'}>Phones</Link>
                  </div>
                  <div className="col-md-6 no-padding">
                      {this.authService.isConnected() === true && 'Connecté en tant que ' + user.username + ' - '}
                      {this.authService.isConnected() === true &&
                      <a onClick={this.logout} href="javascript(void(0))">Se déconnecter</a>}

                  </div>
                  <div className="col-md-12 row">
                      <hr/>
                  </div>
              </div>

          )
      }

  }
}

export default Menu;
