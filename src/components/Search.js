import React, {Component} from 'react';
import store from './../store/MyStore'
import { connect } from 'react-redux';
import ReactTimeout from 'react-timeout';
import InputRange from 'react-input-range';
import AuthService from "./AuthService";

const API = 'http://api.dev/api';

class Search extends Component{

    constructor(props){
        super(props);

        this.state = {
            capacity : {min : 16 , max: 1024},
            price : {min : 0 , max: 1000}
        };

        this.authService = new AuthService();
        this.search = this.search.bind(this);
    }


    search(){




        const self = this;

        var suffix = "";
        var name = document.getElementsByName("name")[0].value;
        var state = document.getElementsByName("state")[0].value;
        var operatingSystem = document.getElementsByName("operatingSystem")[0].value;
        var capacityMin = document.getElementsByName("capacityMin")[0].value;
        var capacityMax = document.getElementsByName("capacityMax")[0].value;
        var priceMin = document.getElementsByName("priceMin")[0].value;
        var priceMax = document.getElementsByName("priceMax")[0].value;


        suffix +="?storageCapacity[between]="+capacityMin+".."+capacityMax;
        suffix +="&price[between]="+priceMin+".."+priceMax;

        if(name !== "") {
            suffix += "&name=" + name;
        }

        if(state !== "") {
            suffix += "&state=" + state;
        }

        if(operatingSystem !== "") {
            suffix += "&operatingSystem=" + operatingSystem;
        }





        fetch(API + '/phones.json'+suffix,
            {
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
            });
    }



    render(){
        return(
            <div className="row search">

                <div className="col-md-12 form-group text-left">
                    <label>Recherche</label>
                    <input name="name" onBlur={this.search}  placeholder="Rechercher un téléphone" className="form-control col-md-12 input-sm"/>
                </div>

                <div className="col-md-12 text-left form-group">
                    <label>Type</label>
                    <select onChange={this.search} name="operatingSystem" className="form-control">
                        <option value="">-- Tous --</option>
                        <option value="Android">Android</option>
                        <option value="IOS">IOS</option>
                    </select>
                </div>

                <div className="col-md-12 text-left form-group">
                        <label>Etat</label>
                        <select onChange={this.search} name="state" className="form-control">
                            <option value="">-- Tous --</option>
                            <option value="new">Neuf</option>
                            <option value="occasion">Occasion</option>
                        </select>
                </div>

                <div className="col-md-12 text-left form-group">
                    <label>Capacité</label>
                    <InputRange
                        name="capacity"
                        allowSameValues = {false}
                        formatLabel={capacity => `${capacity} Go`}
                        value={this.state.capacity}
                        onChange={capacity => this.setState({ capacity })}
                        onChangeComplete={this.search}
                        maxValue={1024}
                        minValue={16}
                    />
                </div>

                <div className="col-md-12 text-left form-group">
                    <label>Prix</label>
                    <InputRange
                        name="price"
                        allowSameValues = {false}
                        formatLabel={price => `${price} €`}
                        value={this.state.price}
                        onChange={price => this.setState({ price })}
                        onChangeComplete={this.search}
                        maxValue={1000}
                        minValue={0}
                    />
                </div>

            </div>
        )
    }

}

export default connect()(Search);