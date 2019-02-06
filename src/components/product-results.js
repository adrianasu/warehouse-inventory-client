import React from 'react';
import { connect } from 'react-redux';

import FilterForm from './filter-form';
import ResultsTable from './results-table';

export class SearchResults extends React.Component{

    constructor(props){
        super(props);
        //console.log("CONS",this.props.data)
        this.state ={
            searchTerm: '',
            currentlyDisplayed: []
        }
        this.onChange = this.onChange.bind(this);
    }
componentDidMount(){
    this.setState({
        currentlyDisplayed: this.props.data
    })
}
  
    onChange(value) {
        console.log(value);
        this.setState(value);
        this.filterData();
    }

    filterData() {
        let searchTerm = this.state.searchTerm;
    
        console.log("DATA ", this.props.data)
        let fields = ['product', 'category', 'manufacturer'];
        if (this.props.data &&
            this.props.data.length !== 0 &&
            searchTerm !== '') {
// return this.props.data
                let currentlyDisplayed = [];
                searchTerm.toLowerCase();
            this.props.data.forEach(item =>
                Object.keys(item).forEach(key => {
                    if (fields.includes(key) && 
                        item[key].name.toLowerCase().includes(searchTerm) ){
                            currentlyDisplayed.push(item);
                    } else if (key === 'location' &&
                        item[key].warehouse.toLowerCase().includes(searchTerm)) {
                            currentlyDisplayed.push(item);
                        }
                    }
                )
            )
            console.log("CURR")
            return this.setState({
                currentlyDisplayed
            });
        }
            
        // } else if(this.props.data &&
        //         this.props.data.length > 0 ) {
        //     console.log("ALL")
        //     return this.setState({
        //         currentlyDisplayed: this.props.data
        //     });

        // }
        
        //return this.state.currentlyDisplayed;

    }


    // Get either the number of items or the message 
    // sent by the server.
    message(){
        let result = this.props.data;
        if( result && result.message ){
            return this.props.data.message;
        } else if( result && result.length > 0){
            return `${this.props.data.length } items found.`;
        }
        return "";
    }

    render(){
        let data = this.state.currentlyDisplayed
         console.log(data);
        return(
            <div>
                <FilterForm onChange={this.onChange}/>
                <p> { this.message() } </p> 
                <ResultsTable fil={this.state.currentlyDisplayed}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.search.data,
    }
}


export default connect( mapStateToProps )( SearchResults );