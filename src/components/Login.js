import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from './AuthService';

const API = 'http://api.dev/app_dev.php/api';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            connected : false,
            message : ""
        }

        this.onSubmit = this.onSubmit.bind(this);

        this.authService =  new AuthService();

    }

    componentDidMount(){


    }

    onSubmit(e){
        e.preventDefault();

        const that = this;

        const username = document.getElementsByName('username')[0].value;
        const password = document.getElementsByName('password')[0].value;

        fetch(API + '/login_check',{
            method : "POST",
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body : "_username="+username+"&_password="+password
        }).then((response) => response.json())
            .then(function(json){
                if(json.token) {
                    console.log(json.token);
                    that.authService.setToken(json.token);
                    that.setState({connected: true});
                }else{
                    that.setState({message: "Login ou mot de passe incorrect"});
                }
            })

    }



    render() {

        if(this.state.connected){
            return(<Redirect to="/phones" />)
        }else {

            return (
                <div className="col-md-12">
                    <div>
                        <h2>Bienvenue sur KaruPhone.</h2>
                        <p>Veuillez vous connecter pour passer vos achats.</p>
                    </div>

                    {this.state.message !== "" &&
                        <div className="alert alert-danger">{this.state.message}</div>
                    }
                    <form onSubmit={this.onSubmit} className="form-signin">
                        <div className="col-md-12 form-group">
                            <div className="col-md-12 form-group">
                                <input required placeholder="Login" name="username" type="text" className="form-control"/>
                            </div>
                            <div className="col-md-12 form-group">
                                <input required placeholder="Mot de passe" name="password" type="password"
                                       className="form-control"/>
                            </div>
                            <div className="col-md-12 form-group">
                                <input type="submit" className="btn btn-primary"/>
                            </div>
                        </div>

                    </form>


                </div>
            );
        }

    }
}

export default Login;
