import React from 'react';
import { connect } from 'react-redux';
import { withRouter }  from 'react-router-dom';

import { fetchData } from '../actions/fetch-data';
import { showModal } from '../actions/modal';

class OverviewLinks extends React.Component{
    constructor() {
        super();
        this.showAll = this.showAll.bind(this);
        this.goToMyAccount = this.goToMyAccount.bind(this);
        this.showAvailableItems = this.showAvailableItems.bind(this);
    }


    showAll() {
        return this.props.fetchData('item', 'searchAll')
            .then(() =>{
                if( this.props.data.length > 0){
                    this.props.history.push('/results/all-items')
                }
            })
    }

    goToMyAccount(){
        let employeeId = this.props.employee.employeeId;
        return this.props.fetchData(employeeId, "myAccount")
            .then(() => {
                // Display results.
                if (this.props.data && this.props.data.employee) {
                    this.props.history.push(`/my-account`)
                }
            })
    }

    showAvailableItems(){
         return this.props.fetchData('true', 'on-shelf')
             .then(() => {
                 if( this.props.data.length > 0){
                     this.props.history.push('/results/available-items');
                 }
                })
    }

    render(){
        return(
            <React.Fragment>
                <button onClick={ this.showAll }>All Items</button>
                <button onClick={ this.showAvailableItems }>Available Items </button>
                <button onClick={ this.goToMyAccount }>My Account</button>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = ({
    fetchData: fetchData,
    showModal: showModal
})
const mapStateToProps = state => ({
    data: state.search.data,
    employee: state.auth.currentUser.employee,
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OverviewLinks));