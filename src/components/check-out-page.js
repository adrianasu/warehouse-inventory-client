import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import CheckOutForm from './check-out-form';
import CheckInOrOutResults from './check-in-out-results';
import { fetchOptions } from '../actions/fetch-options';
import '../css/check-out-page.css';

class CheckOutPage extends React.Component {
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
        let checkedInItems = this.props.options.checkedIn;
        // Display only 3 ids and 3 barcodes.
        for( let x=0; x < 3; x++ ){
            ids.push(employees[x].id);
            barcodes.push(checkedInItems[x].barcode);
        }
        return <span>Barcodes { barcodes.join(", ")}. Employee IDs { ids.join(", ")}.</span>
    }

    render(){
        return(
            <div className="check-out">
                <h1 className="tooltip">Check Out
                    <span className="tooltiptext">{ this.props.options ? this.examples() : null }</span>
                    <FontAwesomeIcon icon="lightbulb" className="space orange"/>
                </h1>
                <CheckOutForm />
                <CheckInOrOutResults checkType="checkOut"/>
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

export default connect( mapStateToProps, mapDispatchToProps )( CheckOutPage );
