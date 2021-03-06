import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchData, resetData } from '../actions/fetch-data';
import Loader from './loader';
import { saveAccountData } from '../actions/account-data';
import { showModal } from '../actions/modal';
import '../css/account-form.css';

export class AccountForm extends React.Component{
     constructor(props) {
        super(props);
        this.state = { 
            value: ''
        };
    }

    displayError() {
         let modalProps = this.props.error.message;
         let modalType = 'ERROR_CHECK_MODAL';
         this.props.showModal(modalType, modalProps);
     }
     
    handleChange(e){
        this.setState({
            value: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        let employeeId = this.state.value;
        this.props.history.push(`/account`);
        return this.props.fetchData({
                    method: 'GET',
                    searchTerm: employeeId,
                    searchType: "myAccount",
        })
        .then(() => {
            if( this.props.data && this.props.data.employee ){
                this.props.saveAccountData(this.props.data);
            }
        });
    }

    resetForm(){
        this.props.resetData();
        this.setState({
            value: ''
        })
    }

    componentDidUpdate(prevProps) {
        // show modal when fetch returns an error
        if (this.props.hasErrored &&
            !prevProps.hasErrored) {
            this.displayError()
        }
    }

    render(){
        return(
            <div className="account-form">
                <form onSubmit={ this.handleSubmit.bind(this)}>
                    <label htmlFor="employeeId">Employee ID</label>
                    <div className="employee-id">
                        <input name="employeeId" 
                            type="number" 
                            id="employeeId"
                            value={ this.state.value}
                            onChange={this.handleChange.bind(this)}
                            required>
                        </input>
                        <button 
                            type="button" 
                            className="small"
                            disabled = {
                                this.props.pristine || this.props.submitting
                            }
                            onClick={ this.resetForm.bind(this) }>
                            X
                        </button>
                      { this.props.isLoading ? <Loader /> :
                        <button 
                            className="main"
                            type="submit"
                            disabled = {
                                this.props.pristine || this.props.submitting
                            }>
                            Search
                        </button>
                      }
                    </div>
                    
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    data: state.search.data,
    error: state.search.error,
    hasErrored: state.search.error !== null,
    isLoading: state.search.loading === true,
});

const mapDispatchToProps = ({
    fetchData,
    resetData,
    saveAccountData,
    showModal,
});

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( AccountForm ));