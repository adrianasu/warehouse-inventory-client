import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';

import Input from './input';
import { login } from '../actions/auth';
import { required, nonEmpty } from './validators';
import { hideModal } from '../actions/modal';

export class LoginForm extends React.Component{
    onSubmit( values ){
        return this.props.dispatch( login(values.username, values.password) );
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
                { error }
                <label htmlFor="username">username</label>
                <Field
                    component={ Input }
                    type="text"
                    name="username"
                    id="username"
                    validate={ [required, nonEmpty] }
                />
                <label htmlFor="password">password</label>
                <Field
                    component={ Input }
                    type="password"
                    name="password"
                    id="password"
                    validate={ [required, nonEmpty] }
                />
                <button disabled={ this.props.pristine || this.props.submitting }>
                    Log in
                </button>
            </form>
      
    </div>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitSuccess: (result, dispatch) => dispatch(hideModal()),
    onSubmitFail: ( errors, dispatch ) => dispatch( focus('login', 'username') )
})( LoginForm );