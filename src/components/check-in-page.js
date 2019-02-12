import React from 'react';
import { connect } from 'react-redux';

import CheckInForm from './check-in-form';
import { fetchOptions } from '../actions/fetch-options';
import { getExamples } from '../utils/utils';
import lightbulb from '../images/lightbulb.png';
import '../css/check-in-page.css';

class CheckInPage extends React.Component {

    componentDidMount() {
        // Fetch options to display examples in demo.
            return this.props.fetchOptions()   
    }

    examples(){
        let employees = this.props.options.employee;
        let checkedOutItems = this.props.options.checkedOut;
        let barcodes = getExamples(checkedOutItems, 'barcode');
        let ids = getExamples(employees, 'id');
        return <span>Barcodes { barcodes.join(", ")}. Employee IDs { ids.join(", ")}.</span>
    }

    render(){

    return(
        <div className="check-in">
            <h1 className="tooltip">Check In
                    <span className="tooltiptext">{ this.props.options ? this.examples() : null }</span>
                    <img src={ lightbulb } alt="Lightbulb cartoon" className="icon"/>
            </h1>
            <CheckInForm />
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
