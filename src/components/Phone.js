import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Search from './Search';
import { connect } from 'react-redux';
import store from './../store/MyStore';
import AuthService from './AuthService';

import LiveChat from 'react-livechat';


const API = 'http://api.dev/api';
//const API = 'http://api.dev/test.php';

class Phone extends Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading : false,
            error: false
        };

        this.authService = new AuthService();

    }

    componentDidMount(){

        const self = this;


        fetch(API + '/phones.json',{
            headers : {
                "Authorization" : "Bearer "+self.authService.getToken()
            }
        })
            .then((resp) => resp.json())
            .then(function(data){
                store.dispatch({
                    type: 'SET_PHONES',
                    phones: data,
                });
                self.setState({isLoading : true});
            }).catch(function() {
                self.setState({error : true});
                console.log("error");
            });

    }

    handleClick(phone){

       alert("Phone => "+ phone.name + ' ('+phone.price+' €)');

    }


  render() {


      const {phones} =  store.getState();
      const {isLoading, error} = this.state;



      if (isLoading) {
            return (

                    <div className="row">
                        <div className="col-md-12">
                            <h1> {phones.length} Téléphones</h1>
                        </div>
                        <div className="row col-md-12">
                            <div className="col-md-3">
                                <Search />
                            </div>
                            <div className="col-md-9 row">

                                { (phones.length) > 0 && phones.map(phone =>
                                    <div onClick={(e) => this.handleClick(phone)} className="col-md-3 padding-5">
                                        <div className={'col-md-12 phone ' + phone.state}>
                                            <div className="col-md-12">
                                                <h2>{phone.name}</h2>
                                            </div>
                                            <div className="col-md-12">
                                                <i>{phone.operatingSystem}</i>
                                            </div>
                                            <div className="col-md-12">{phone.storageCapacity} Go</div>
                                            <div className="col-md-12">{phone.price} €</div>
                                        </div>
                                    </div>
                                )}

                                {error &&
                                    <div class="alert alert-danger">Erreur lors de la récupération des données</div>
                                }


                            </div>
                        </div>
                    </div>



            );
        }else{
          return(<div>...</div>);
      }


  }
}

const mapStateToProps = (state) => ({
    state: state
});


export default connect(mapStateToProps)(Phone);
