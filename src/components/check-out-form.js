import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus, reset } from 'redux-form';

import { doCheckInOrOut } from '../actions/check-in-out';

import Input from './input';
import RadioInput from './radio-input';

class CheckOutForm extends React.Component{
 
    onSubmit( values ){
        return this.props
            .doCheckInOrOut( values, 'check-out' )         
    }


    render(){

        return(
            <div>
                <h1>Check Out</h1>
                <p> Enter the item ID and employee ID of the person receiving the item.</p>
                <form
                    className='check-out-form'
                    onSubmit={ this.props.handleSubmit(values => 
                        this.onSubmit(values))}>
                    
                    <Field component={ Input } type="text" name="itemId" label="Item ID"/>
                    <Field component={ Input } type="text" name="employeeId" label="Employee ID"/>
                    <Field component={ RadioInput } 
                        name="condition" 
                        label="Condition"
                        options={
                            { 'in-use': "in-use",
                            broken: "broken",
                            lost: "lost",
                            stolen: "stolen",
                            }
                        }
                      />
                  
                    <button type ="submit" >
                        Check Out
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
    doCheckInOrOut: doCheckInOrOut

})

CheckOutForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckOutForm);

export default reduxForm({
    form: 'checkOut',
    onSubmitSuccess: (result, dispatch) =>
        dispatch( reset('checkOut')),
    onSubmitFail: ( errors, dispatch ) =>
        dispatch( focus( 'checkOut', Object.keys(errors)[0]))
}) (CheckOutForm);

 
