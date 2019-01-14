import React from 'react';
import { connect } from 'react-redux';
import { withRouter }  from 'react-router-dom';

import { fetchData } from '../actions/fetch-data';

class OverviewLinks extends React.Component{
    constructor() {
        super();
        this.showAll = this.showAll.bind(this);
        this.goToMyAccount = this.goToMyAccount.bind(this);
        this.fetchOnShelfItems = this.fetchOnShelfItems.bind(this);
    }


    showAll() {
        return this.props.fetchData(null, 'searchAll')
            .then(this.props.history.push('/results'))
    }

    goToMyAccount(){
        this.props.history.push('/my-account');
    }

    fetchOnShelfItems(){
         return this.props.fetchData('true', 'onShelf')
             .then(this.props.history.push('/results'))
    }

    render(){
        return(
            <React.Fragment>
                <button onClick={ this.showAll }>All Items</button>
                <button onClick={ this.goToMyAccount }>My Account</button>
                <button onClick={ this.fetchOnShelfItems }>Available Items </button>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = ({
    fetchData: fetchData,
})

export default withRouter(connect(null, mapDispatchToProps)(OverviewLinks));