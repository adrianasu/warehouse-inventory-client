import React from 'react';
import { reduxForm, Field, focus } from 'redux-form';
import Input from './input';
import { required, nonEmpty, email, length, isTrimmed } from './validators';
import { signupUser } from '../actions/users';
import { login } from '../actions/auth';
import { hideModal } from '../actions/modal';

const passwordLength = length({ min: 7, max: 72 });

export class SignUpForm extends React.Component {
    onSubmit( values ){
        const { username, password } = values;
        return this.props
            .dispatch( signupUser( values ))
            .then(() => this.props.dispatch(login( username, password )));
    }

    render() {
        return (
            <form   // props.handleSubmit is a Redux Form callback function
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}
                className="signup-form">

                <label htmlFor="firstName">First name</label>
                <Field 
                    component={Input} 
                    name="firstName" 
                    type="text" 
                    validate={[required, nonEmpty]} />
                <label htmlFor="lastName">Last name</label>
                <Field 
                    component={Input} 
                    name="lastName" 
                    type="text" 
                    validate={[required, nonEmpty]} />
                <label htmlFor="email">email</label>
                <Field
                    component={Input}
                    name="email"
                    type="email"
                    validate={[required, nonEmpty, email]}
                />
                <label htmlFor="username">username</label>
                <Field
                    component={Input}
                    name="username"
                    type="text"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <label htmlFor="password">password</label>
                <Field
                    component={Input}
                    name="password"
                    type="password"
                    validate={[required, nonEmpty, passwordLength, isTrimmed]}
                />
                <button
                    disabled={this.props.pristine || this.props.submitting}
                    type="submit">
                    Sign Up
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'signup',  // the info will be in state.form.signup
    onSubmitSuccess: (results, dispatch) => 
        dispatch( hideModal()),
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('signup', Object.keys(errors)[0]))
})(SignUpForm);