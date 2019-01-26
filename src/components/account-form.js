import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/fetch-data';
import { showModal } from '../actions/modal';

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
        this.props.history.push(`/account`)
        return this.props.fetchData({
                    method: 'GET',
                    searchTerm: employeeId,
                    searchType: "myAccount",
        })
            
            
        .then(() => {
            // Display results, if found.
            if (this.props.data && this.props.data.employee) {
                this.props.history.push(`/account/${employeeId}`)
            }
        })
    }

    resetForm(){
        this.props.history.push(`/account`);
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
            <form className="account-form" onSubmit={ this.handleSubmit.bind(this)}>
                <label htmlFor="employeeId">Employee ID</label>
                <input name="employeeId" 
                    type="number" 
                    id="employeeId"
                    value={ this.state.value}
                    onChange={this.handleChange.bind(this)}></input>
                <button 
                    className="search-button"
                    type="submit"
                    disabled = {
                            this.props.pristine || this.props.submitting
                        }>
                    Search
                </button>
                <button 
                    type="button" 
                    disabled = {
                        this.props.pristine || this.props.submitting
                    }
                    onClick={ this.resetForm.bind(this) }>
                    Reset
                </button>
            </form>
        )
    }
}
const mapStateToProps = state => ({
    data: state.search.data,
    error: state.search.error,
    hasErrored: state.search.error !== null,
});

const mapDispatchToProps = ({
    fetchData: fetchData,
    showModal: showModal,
});

export default connect( mapStateToProps, mapDispatchToProps )( AccountForm );