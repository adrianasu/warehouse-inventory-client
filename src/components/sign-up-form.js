import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, focus } from 'redux-form';

import { fetchOptions } from '../actions/fetch-options';
import { hideModal } from '../actions/modal';
import Input from './input';
import { login } from '../actions/auth';
import { required, nonEmpty, email, length, isTrimmed, isEqual } from '../utils/validators';
import { signupUser } from '../actions/users';
import { underlineOption } from '../actions/underline-option';
import '../css/sign-form.css';

const passwordLength = length({ min: 7, max: 72 });

export class SignUpForm extends React.Component {

    onSubmit( values ){
        const { email, password } = values;
        return this.props.signupUser( values )
            .then(() => {
                return this.props.login( email, password )
            })
           .then(() => {
               this.props.hideModal();
               this.props.underlineOption("home");
               return this.props.history.push("/home");
           });
    }

    render() {
        let error;
        if( this.props.error ){
            error = (
                <div className="form-error" aria-live="polite">
                    { this.props.error }
                </div>
            );
        }

        return (
            <div className="sign-form form">
            <form   // props.handleSubmit is a Redux Form callback function
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>

                <label htmlFor="employeeId">Employee Id</label>
                <Field 
                    component={Input} 
                    name="employeeId" 
                    type="number" 
                    validate={[required, nonEmpty]} />
             
                <label htmlFor="email">email</label>
                <Field
                    component={Input}
                    name="email"
                    type="email"
                    validate={[required, nonEmpty, email]}
                />
               
                <label htmlFor="password">Password</label>
                <Field
                    component={Input}
                    name="password"
                    type="password"
                    validate={[required, nonEmpty, passwordLength, isTrimmed]}
                />
                <label htmlFor="confirmPassword">Confirm password</label>
                <Field
                    component={Input}
                    name="confirmPassword"
                    type="password"
                    validate={[required, nonEmpty, isEqual]}
                />
                <button
                    disabled={this.props.pristine || this.props.submitting}
                    type="submit"
                    className="sign-up-button">
                    Sign Up
                </button>
              { error }
            </form>
            </div>
        );
    }
}

const mapDispatchToProps = ({
    fetchOptions,
    hideModal,
    login,
    signupUser,
    underlineOption,
})

SignUpForm = connect(
    null,
    mapDispatchToProps
)(SignUpForm);

export default reduxForm({
    form: 'signup',  // the info will be in state.form.signup
    onSubmitFail: (errors, dispatch) => {
        dispatch(focus('signup', 'employeeId'));
    }
})(SignUpForm);