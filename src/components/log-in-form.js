import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';

import { hideModal } from '../actions/modal';
import Input from './input';
import { login } from '../actions/auth';
import { required, nonEmpty, email, length, isTrimmed } from '../utils/validators';
import { underlineOption } from '../actions/underline-option';
import '../css/sign-form.css';

const passwordLength = length({ min: 7, max: 30 })

export class LoginForm extends React.Component{
  
    onSubmit( values ){
        return this.props.login(values.email, values.password)
        .then(() => {
            this.props.hideModal();
            this.props.underlineOption("home"); 
            return this.props.history.push("/home");
            });     
    }

    render(){
        let error;
        if( this.props.error ){
            error = (
                <div className="form-error" aria-live="polite">
                    { this.props.error }
                </div>
            );
        }
        return (
            <div className="form sign-form">
            <form
                onSubmit={ this.props.handleSubmit( values =>
                    this.onSubmit( values )
                )}>
               
                <label htmlFor="email">email</label>
                <Field
                    component={ Input }
                    type="text"
                    name="email"
                    id="email"
                    validate={ [required, nonEmpty, email] }
                />
                <label htmlFor="password">password</label>
                <Field
                    component={ Input }
                    type="password"
                    name="password"
                    id="password"
                    validate={ [required, nonEmpty, passwordLength, isTrimmed] }
                />
                <button 
                    className="log-in-button form"
                    disabled={ this.props.pristine || this.props.submitting }>
                    Log in
                </button> 
                 { error }
            </form>
        </div>
        );
    }
}
const mapDispatchToProps = ({
    hideModal,
    login,
    underlineOption,
})

LoginForm = connect(
    null,
    mapDispatchToProps
)(LoginForm);

export default reduxForm({
    form: 'login',
    onSubmitFail: ( errors, dispatch ) => 
        dispatch( focus('login', 'email') )
})( LoginForm );