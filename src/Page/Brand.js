import React, { Component } from 'react';

const API = 'http://api.dev/app_dev.php';

class Brand extends Component {

    constructor(props){
        super(props);
        this.state = {
            brands : null,
            isLoading : false
        };
    }

    componentDidMount(){

        const self = this;

        fetch(API + '/brands.json')
            .then((resp) => resp.json())
            .then(function(data){
                self.setState({isLoading : true, brands : data});
            });

    }


  render() {

        const { brands, isLoading } = this.state;


        if (isLoading) {
            console.log(brands);
            return (

                <div className="App">

                    <p className="App-intro">


                        <h1>Marques</h1>
                        <div className="row no-padding">
                            {brands.map(brand =>
                                <div className="col-md-3 padding-5">
                                    <div className="col-md-12 no-padding">
                                        <div className="col-md-12">
                                            <h4>{ brand.name}</h4>
                                        </div>

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

export default Brand;
