import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './App.css';
import {data} from './data.js';

   
var nameOptions = data.data.allPeople.people.map(function(obj){
    var names = {value:'', label: ''};
    names.value = obj.name;
    names.lable = obj.name;
    return names;    
});

var people1 = {};
var people2 = {};


var App = React.createClass({
    
    getInitialState: function(){
        return{
            searchResult: []
        }
    },
    
    showResult: function(response){
        console.log(response.same);
        this.setState({ searchResult : response.same});
        },
    
    /* using the ajax method
    
    search: function(){
        $.ajax({
            url: URL,
            type: "GET",
            dataType: "JSONP",
            crossDomain: true,
            success: function(data){
                console.log(data);
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        })    
    }
    */
    
    search: function(){
        var people1Index = nameOptions.indexOf(people1)
        var people2Index = nameOptions.indexOf(people2)
        
        console.log(people1Index);
        console.log(data.data.allPeople.people[people1Index].filmConnection.films);
        console.log(data.data.allPeople.people[people2Index].filmConnection.films);

        
        //
        var filmsWithPeople1 = {};
        filmsWithPeople1 = data
                            .data.allPeople
                            .people[people1Index]
                            .filmConnection.films;
        
        var filmsWithPeople2 = {};
        filmsWithPeople2 = data
                            .data.allPeople
                            .people[people2Index]
                            .filmConnection.films;
        
        
        var result = {same: [{titile: "result_title"}]};
        //check if they have duplication
        for(var title in filmsWithPeople1){
            if(Object.prototype.hasOwnProperty.call(filmsWithPeople2, title)){
                result.same.push(filmsWithPeople1[title]);
            }
        }
        this.showResult(result)
    },
  
    render: function(){
        return (
            <div className="App">
                <div className="App-search-box">
                    <ul className="DropDown">
                        <li><SearchPeople1 /></li>
                        <li><SearchPeople2 /></li>
                        <li><SearchButton search={this.search}/></li>
                    </ul>
                </div>
                
                <div >
                    <Results searchResult={this.state.searchResult} />
                </div>
            </div>
            );
    } 
    
});



var SearchPeople1 = React.createClass({

    
    getInitialState: function() {
        return{
            state: {selected: nameOptions.value}
        };
    }, 
    
    logChange: function(val){
        this.setState({selected: val});
        people1 = val;
        console.log(people1);
    },
    
    render: function(){
        return (
            <div>
                <Select
                    name="form-field-name"
                    value={this.selected}
                    options={nameOptions}
                    onChange={this.logChange}
                />
            </div>  
        );
    }
    
});

var SearchPeople2 = React.createClass({
    
    getInitialState: function(){
        return{
            state: {selected: nameOptions[0].value}
        }
    },            
    
    logChange: function(val){
        this.setState({selected: val});
        people2 = val;
        console.log(people2);
    },
    
    render: function(){
        return (
            <div>
                <Select
                    name="form-field-name"
                    value={this.selected}
                    options={nameOptions}
                    onChange={this.logChange}
                />
            </div>     
        );
        
    }   
});


var SearchButton = React.createClass({ 
    //input button, click to post request 
     render: function(){
        return (
            <div>
                <input type="submit" onClick={this.createAjax}/>
            </div>
        );
        
    },
    //post request
    /*
    createAjax: function(){
        var URL = '';
        this.props.search(URL)
    }
    */
    
    createAjax: function(){
        this.props.search();
    }
    
});

var Results = React.createClass({
    
    render: function(){
        var resultItems = this.props.searchResult.map(function(result) {
            return <ResultItem filmtitle={result.title} />
        });
        
        return(
            <ul>
                {resultItems}
            </ul>           
        );
    }
});

var ResultItem = React.createClass({
    
    
    render: function(){
        return <li>{this.props.filmtitle}</li>;
    }
});










export default App;
