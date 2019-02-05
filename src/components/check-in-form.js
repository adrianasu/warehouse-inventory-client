import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus, reset } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { doCheckInOrOut } from '../actions/check-in-out';
import Input from './input';
import { required, nonEmpty } from '../utils/validators';
import '../css/check-in-form.css';

class CheckInForm extends React.Component{
 
    onSubmit( values ){
        return this.props.doCheckInOrOut( values, 'check-in' )        
    }

    render(){
           let info = <div className="tooltip">Employee ID<FontAwesomeIcon icon="question-circle" className="space orange"/>
                    <span className="tooltiptext">Employee ID of the person returning the item</span>
                </div>;

        return(
            <div className="check-in-form form">
                <form
                    onSubmit={ this.props.handleSubmit(values => 
                        this.onSubmit(values))}>
                    
                    <Field 
                        component={ Input } 
                        type="number" 
                        name="barcode" 
                        label="Barcode"
                        validate={[required, nonEmpty]}/>
                    <Field 
                        component={ Input } 
                        type="number" 
                        name="employeeId" 
                        label={ info }
                        validate={[required, nonEmpty]}/>
                  
                    <button 
                        disabled={this.props.pristine || this.props.submitting}
                        type ="submit" >
                        Check In
                    </button>
                </form>  
                </div>        
          );
    }
}
  
const mapStateToProps = state => ({
    options: state.options.options
})

const mapDispatchToProps = ({
    doCheckInOrOut: doCheckInOrOut,
})

CheckInForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckInForm);

export default reduxForm({
    form: 'checkOut',
    onSubmitSuccess: (result, dispatch) =>
        dispatch( reset('checkOut')),
    onSubmitFail: ( errors, dispatch ) =>
        dispatch( focus( 'checkOut', Object.keys(errors)[0]))
}) (CheckInForm);

 
