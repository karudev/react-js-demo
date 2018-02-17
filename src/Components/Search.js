import React, {Component} from 'react';
import store from './../Store/MyStore'
import { connect } from 'react-redux';
import ReactTimeout from 'react-timeout'

const API = 'http://api.dev';

class Search extends Component{



    search(){

        var suffix = "";
        var name = document.getElementsByName("name")[0].value;
        var state = document.getElementsByName("state")[0].value;
        var operatingSystem = document.getElementsByName("operatingSystem")[0].value;


        if(name !== "") {
            suffix += "name=" + name;
        }

        if(state !== "") {
            suffix += (suffix != "" ? "&" : "")+"state=" + state;
        }

        if(operatingSystem !== "") {
            suffix += (suffix != "" ? "&" : "")+"operatingSystem=" + operatingSystem;
        }



        fetch(API + '/phones.json?'+suffix)
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
                    <input name="name" onBlur={this.search}  placeholder="Rechercher un téléphone (Nom, Capacité, Prix...)" className="form-control col-md-12 input-sm"/>
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
            </div>
        )
    }

}

export default connect()(Search);