import React, { Component } from 'react';
import logo from './../logo.svg';
import './../App.css';

    const API = 'http://api.dev/app_dev.php';
//const API = 'http://api.dev/test.php';

class Phone extends Component {

    constructor(props){
        super(props);
        this.state = {
            phones : null,
            isLoading : false
        };
    }

    componentDidMount(){

        const self = this;

        fetch(API + '/phones.json')
            .then((resp) => resp.json())
            .then(function(data){
                self.setState({isLoading : true, phones : data});
            });

    }


  render() {

        const { phones, isLoading } = this.state;

        if (isLoading) {
            return (

                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">


                        <h1>Téléphones</h1>
                        <div className="row no-padding">
                            {phones.map(phone =>
                                <div className="col-md-3 padding-5">
                                    <div className="col-md-12 no-padding phone {phone.state}">
                                        <div className="col-md-12">
                                            <h4>{ phone.name}</h4>
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

                    </p>
                </div>
            );
        }else{
            return( <div className="App">...</div>)
        }


  }
}

export default Phone;
