import React from 'react';
import ReactToPrint from 'react-to-print';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import AccountForm from './account-form';
import AccountResults from './account-results';
import { fetchOptions } from '../actions/fetch-options';
import '../css/account-page.css';


class AccountPage extends React.Component{

    componentDidMount() {
        // Fetch options to display examples in demo.
        if (!this.props.options) {
            return this.props.fetchOptions()   
        }
    }

    examples(){
        let ids = [];
        // Display only 5 ids.
        let employees = this.props.options.employee;
        for( let x=0; x < 5; x++ ){
            ids.push(employees[x].id);
        }
        return <span>Employee IDs e.g. { ids.join(", ")}</span>
    }

    render(){
        return(
            <div className="account-page">
                <h1 className="tooltip">Account
                    <span className="tooltiptext">{ this.props.options ? this.examples() : null }</span>
                    <FontAwesomeIcon icon="lightbulb" className="space orange"/>
                </h1>
                <AccountForm />
                { this.props.data && this.props.data.employee ?
                    <div className="account-results">
                        <ReactToPrint
                            trigger={() => 
                                <button className="right tooltip">
                                    <FontAwesomeIcon icon="print" />
                                    <span className="tooltiptext">Print</span>
                                </button>}
                            content={() => this.componentRef }
                            closeAfterPrint={true}
                            className="tooltip"
                            />
                        <AccountResults 
                            ref={el => (this.componentRef = el )} 
                        /> 
                    </div>
                    : null
                }
            </div>    
        )
    }
}

const mapStateToProps = state => ({
    data: state.search.data,
    options: state.options.options,
})

const mapDispatchToProps = ({
    fetchOptions,
});

export default connect( mapStateToProps, mapDispatchToProps )(AccountPage);