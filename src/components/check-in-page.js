import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import CheckInForm from './check-in-form';
import CheckInOrOutResults from './check-in-out-results';
import { fetchOptions } from '../actions/fetch-options';
import '../css/check-in-page.css';

class CheckInPage extends React.Component {

    componentDidMount() {
        // Fetch options to display examples in demo.
        if (!this.props.options) {
            return this.props.fetchOptions()   
        }
    }

    examples(){
        let ids = [];
        let barcodes = [];
        let employees = this.props.options.employee;
        let checkedOutItems = this.props.options.checkedOut;
        // Display only 3 ids and 3 barcodes.
        for( let x=0; x < 3; x++ ){
            ids.push(employees[x].id);
            barcodes.push(checkedOutItems[x].barcode);
        }
        return <span>Barcodes { barcodes.join(", ")}. Employee IDs { ids.join(", ")}.</span>
    }

    render(){

    return(
        <div className="check-in">
            <h1 className="tooltip">Check In
                    <span className="tooltiptext">{ this.props.options ? this.examples() : null }</span>
                    <FontAwesomeIcon icon="lightbulb" className="space orange"/>
            </h1>
            <CheckInForm />
            <CheckInOrOutResults checkType="checkIn" />
        </div>
    );
    }
}

const mapStateToProps = state => ({
    options: state.options.options,
})

const mapDispatchToProps = ({
    fetchOptions,
});

export default connect( mapStateToProps, mapDispatchToProps )( CheckInPage );
