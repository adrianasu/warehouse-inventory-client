import React from 'react';
import ReactToPrint from 'react-to-print';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import AccountForm from './account-form';
import AccountResults from './account-results';
import { fetchOptions } from '../actions/fetch-options';
import { PUBLIC_ACCESS_LEVEL } from '../utils/list-content';
import { resetData } from '../actions/fetch-data';
import '../css/account-page.css';


class AccountPage extends React.Component{

    componentDidMount() {
        // Fetch options to display examples in demo.
        if (!this.props.options) {
            return this.props.fetchOptions()   
        }
    }

    componentWillUnmount(){
        this.props.resetData();
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
        let resultsClass = this.props.accessLevel >= PUBLIC_ACCESS_LEVEL ?
            "account-page" : "account-page increase-margin";
        return(
            <div className={ resultsClass }>
                { this.props.accessLevel >= PUBLIC_ACCESS_LEVEL ?
                    <React.Fragment>
                        <h1 className="tooltip">Account
                            <span className="tooltiptext">{ this.props.options ? this.examples() : null }</span>
                            <FontAwesomeIcon icon="lightbulb" className="space orange"/>
                        </h1>
                        <AccountForm />
                    </React.Fragment>
                    : null
                }
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
    accessLevel: state.auth.currentUser.accessLevel
})

const mapDispatchToProps = ({
    fetchOptions,
    resetData
});

export default connect( mapStateToProps, mapDispatchToProps )(AccountPage);
