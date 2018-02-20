import {Component} from 'react';
import jwt_decode from 'jwt-decode';

class AuthService extends Component{


    constructor(props){
        super(props);
    }


    getToken(){

        return localStorage.getItem('token');

    }

    setToken(token){

        localStorage.setItem('token', token);
    }

    isConnected(){


        return localStorage.getItem('token') != null;
    }

    getUser(){
        if (this.isConnected()) {
            return jwt_decode(localStorage.getItem('token'));
        }else{
            return null;
        }
    }

    logout(){

        return localStorage.removeItem('token');
    }

}

export default AuthService;


