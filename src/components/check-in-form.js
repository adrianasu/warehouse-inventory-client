import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus, reset } from 'redux-form';

import { required, nonEmpty } from '../utils/validators';

import { doCheckInOrOut } from '../actions/check-in-out';
import '../css/check-in-form.css';
import Input from './input';

class CheckInForm extends React.Component{
 
    onSubmit( values ){
        return this.props.doCheckInOrOut( values, 'check-in' )        
    }

    render(){

        return(
            <div className="check-in-form form">
                <p> Enter the item ID and employee ID of the person returning the item.</p>
                <form
                    onSubmit={ this.props.handleSubmit(values => 
                        this.onSubmit(values))}>
                    
                    <Field 
                        component={ Input } 
                        type="number" 
                        name="itemId" 
                        label="Item ID"
                        validate={[required, nonEmpty]}/>
                    <Field 
                        component={ Input } 
                        type="number" 
                        name="employeeId" 
                        label="Employee ID"
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

 
