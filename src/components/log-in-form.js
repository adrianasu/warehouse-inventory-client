import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';

import Input from './input';
import { login } from '../actions/auth';
import { required, nonEmpty, email, length, isTrimmed } from '../utils/validators';
import { hideModal } from '../actions/modal';

const passwordLength = length({ min: 7, max: 30 })

export class LoginForm extends React.Component{
    onSubmit( values ){
        return this.props.dispatch( 
            login(values.email, values.password) );
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
            <div>
            <form
                className="login-form"
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
                <button disabled={ this.props.pristine || this.props.submitting }>
                    Log in
                </button>
                 
                 { error }
            </form>
      
    </div>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitSuccess: (result, dispatch) => 
        dispatch(hideModal()),
    onSubmitFail: ( errors, dispatch ) => 
        dispatch( focus('login', 'email') )
})( LoginForm );