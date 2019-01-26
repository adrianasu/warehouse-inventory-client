import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus, reset } from 'redux-form';

import { doCheckInOrOut } from '../actions/check-in-out';

import Input from './input';

class CheckInForm extends React.Component{
 
    onSubmit( values ){
        return this.props.doCheckInOrOut( values, 'check-in' )        
    }

    render(){

        return(
            <div>
                <h1>Check-In</h1>
                <p> Enter the item ID and employee ID of the person returning the item.</p>
                <form
                    className='check-in-form'
                    onSubmit={ this.props.handleSubmit(values => 
                        this.onSubmit(values))}>
                    
                    <Field component={ Input } type="text" name="itemId" label="Item ID"/>
                    <Field component={ Input } type="text" name="employeeId" label="Employee ID"/>
                  
                    <button type ="submit" >
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

 
