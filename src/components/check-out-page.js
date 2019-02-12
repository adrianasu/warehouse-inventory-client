import React from 'react';
import { connect } from 'react-redux';

import CheckOutForm from './check-out-form';
import { fetchOptions } from '../actions/fetch-options';
import { getExamples } from '../utils/utils';
import lightbulb from '../images/lightbulb.png';
import '../css/check-out-page.css';

class CheckOutPage extends React.Component {
   
    componentDidMount() {
        // Fetch options to display examples in demo.
            return this.props.fetchOptions()   
    }

    examples(){
        let employees = this.props.options.employee;
        let checkedInItems = this.props.options.checkedIn;
        let barcodes = getExamples(checkedInItems, 'barcode');
        let ids = getExamples(employees, 'id');
        return <span>Barcodes { barcodes.join(", ")}. Employee IDs { ids.join(", ")}.</span>
    }

    render(){
        return(
            <div className="check-out">
                <h1 className="tooltip">Check Out
                    <span className="tooltiptext">{ this.props.options ? this.examples() : null }</span>
                    <img src={ lightbulb } alt="Lightbulb cartoon" className="icon"/>
                </h1>
                <CheckOutForm /> 
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
