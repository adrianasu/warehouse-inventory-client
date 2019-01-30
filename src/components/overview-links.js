import React from 'react';
import { connect } from 'react-redux';
import { withRouter }  from 'react-router-dom';

import { fetchData } from '../actions/fetch-data';
import { showModal } from '../actions/modal';
import { underlineOption } from '../actions/underline-option';

class OverviewLinks extends React.Component{

    closeOrUnderline(option) {
        // If click comes from side drawer, close it.
        if (this.props.fromSideDrawer) {
            this.props.closeSideDrawer();
            // If click comes from header-bar, underline
            // selected option.
        } else {
            this.props.underlineOption(option);
        }
    }
  
    showAll() {
        this.closeOrUnderline("all-items");
        return this.props.fetchData({
            method: 'GET',
            searchTerm: 'item', 
            searchType: 'searchAll'
        })
        .then(() =>{
            if( this.props.data.length > 0){
                this.props.history.push('/results/all-items')
            }
        })
    }

    goToMyAccount(){
        this.closeOrUnderline("my-account");
        let employeeId = this.props.employee.employeeId;
        return this.props.fetchData({
            method: 'GET',
            searchTerm: employeeId, 
            searchType: 'myAccount'
            })
            .then(() => {
                // Display results.
                if (this.props.data && this.props.data.employee) {
                    this.props.history.push(`/my-account`)
                }
            })
    }

    showAvailableItems(){
        this.closeOrUnderline("available-items");
         return this.props.fetchData({
             method: 'GET',
             searchType: 'on-shelf'
        })
        .then(() => {
            if( this.props.data.length > 0){
                this.props.history.push('/results/available-items');
            }
        })
    }

    render(){
        return(
            <React.Fragment>
                <li><button 
                    className={this.props.activeOption === "all-items" ? "show-active" : null}
                    onClick={ this.showAll.bind(this) }>All Items
                </button></li>
                <li><button
                    className={this.props.activeOption === "available-items" ? "show-active" : null}
                    onClick={ this.showAvailableItems.bind(this) }>Available Items
                </button></li>
                <li><button 
                    className={this.props.activeOption === "my-account" ? "show-active" : null}
                    onClick={ this.goToMyAccount.bind(this) }>My Account  
                </button></li>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = ({
    fetchData,
    showModal,
    underlineOption
})

const mapStateToProps = state => ({
    activeOption: state.underline.activeOption,
    data: state.search.data,
    employee: state.auth.currentUser.employee,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OverviewLinks));