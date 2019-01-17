import React from 'react';
import { reduxForm, Field, focus } from 'redux-form';
import Input from './input';
import { required, nonEmpty, email, length, isTrimmed, isEqual } from './validators';
import { signupUser } from '../actions/users';
import { login } from '../actions/auth';
import { hideModal } from '../actions/modal';

const passwordLength = length({ min: 7, max: 72 });

export class SignUpForm extends React.Component {
    onSubmit( values ){
        const { email, password } = values;
        return this.props
            .dispatch( signupUser( values ))
            .then(() => this.props.dispatch(login( email, password )));
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
            <form   // props.handleSubmit is a Redux Form callback function
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}
                className="signup-form">

                <label htmlFor="employeeId">employeeId</label>
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
                    type="submit">
                    Sign Up
                </button>
              { error }
            </form>
        );
    }
}

export default reduxForm({
    form: 'signup',  // the info will be in state.form.signup
    onSubmitSuccess: (result, dispatch) => {
        dispatch( hideModal()); 
    },
    onSubmitFail: (errors, dispatch) => {
        //dispatch(reset('signup'));
        dispatch(focus('signup', Object.keys(errors)[0]));
    }
})(SignUpForm);