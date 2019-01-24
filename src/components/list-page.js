import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import { fetchData } from '../actions/fetch-data';
import FilterForm from './filter-form';
import ListTable from './list-table';

class ListPage extends React.Component{

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
        // When an item has been deleted, updated
        // or created, the user will be sent back to the 
        // list, so we need to fetch our updated data.
        if( this.props.wasDeleted 
            || this.props.wasUpdated
            || this.props.hasErrored
            || this.props.wasCreated ){

            // Use last search query values
            let query = this.props.query;
            return this.props.fetchData(query)
            .then(() => 
                this.setState({
                    currentlyDisplayed: this.props.data
                })
            )
        } else {
            this.setState({
                currentlyDisplayed: this.props.data
            })
        }
    }
    

    filterData() {
        let searchTerm = this.state.searchTerm;
        // let re = new RegExp(searchTerm)
        // console.log("TERM ", re)
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

    onChange(value) {
        console.log(value);
        this.setState(value);
        this.filterData();
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

    handleClick(){
        // send to create form
        let dataType = this.props.match.params.type;
        this.props.history.push(`/create/${dataType}`);
    }


    render(){
        let doNotCreate = ['checked-out', 'on-shelf', 'useful-life', 'low-stock', 'user'];
        let data = this.state.currentlyDisplayed
        let reportType = this.props.match.params.type;
        return(
            <div>
                <h1>{ reportType.replace("-", " ") } </h1>
                { 
                    doNotCreate.includes(reportType) ? null
                        : <button onClick={ this.handleClick.bind(this) }>+New</button>
                }
                <FilterForm onChange={this.onChange}/>
                <p> { this.message() } </p> 
                <ListTable 
                    currData={ data } 
                    reportType={ reportType }/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.search.data,
        formProps: state.showForm.formProps,
        hasErrored: state.search.error !== null,
        query: state.query.values,
        wasCreated: state.search.data.created,
        wasDeleted: state.search.data.deleted,
        wasUpdated: state.search.data.updated,

    }
}

const mapDispatchToProps = ({
    fetchData
})

export default connect( mapStateToProps, mapDispatchToProps )( ListPage );