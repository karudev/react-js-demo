import React, { Component } from 'react';
import logo from './../logo.svg';
import './../App.css';
import Search from './Search';
import { connect } from 'react-redux';
import store from './../Store/MyStore'

import LiveChat from 'react-livechat';


const API = 'http://api.dev';
//const API = 'http://api.dev/test.php';

class Phone extends Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading : false
        };

    }

    componentDidMount(){

        const self = this;


        fetch(API + '/phones.json')
            .then((resp) => resp.json())
            .then(function(data){
                store.dispatch({
                    type: 'SET_PHONES',
                    phones: data,
                });
                self.setState({isLoading : true});
            });

    }

    handleClick(phone){

       alert("Phone => "+ phone.name + ' ('+phone.price+' €)');

    }


  render() {


        const {phones} =  store.getState();

        const {isLoading} = this.state;


        if (isLoading) {
            return (

                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <div className="row App-intro">


                        <div className="col-md-12">
                            <h1> {phones.length} Téléphones</h1>
                        </div>
                        <div className="col-md-3">
                            <Search />
                        </div>
                        <div className="row col-md-9">
                            {phones.map(phone =>
                                <div onClick={(e) => this.handleClick(phone)} className="col-md-3 padding-5">
                                    <div className={'col-md-12 phone ' + phone.state}>
                                        <div className="col-md-12">
                                            <h2>{ phone.name}</h2>
                                        </div>
                                        <div className="col-md-12">
                                            <i>{ phone.operatingSystem}</i>
                                        </div>
                                        <div className="col-md-12">{ phone.storageCapacity} Go</div>
                                        <div className="col-md-12">{ phone.price } €</div>
                                    </div>
                                </div>
                            )}

                        </div>

                    </div>
                    {/*<LiveChat license={9506870} />*/}
                </div>
            );
        }else{
            return( <div className="App">...</div>)
        }


  }
}

const mapStateToProps = (state) => ({
    state: state
});


export default connect(mapStateToProps)(Phone);
