import React from 'react';
import { Field } from 'redux-form';

export function RadioInput( props ) {
    const renderRadioButtons = ( key, index ) => {
        return(
            <label key={index} htmlFor={ props.input.name }>
            <Field 
                id={ props.input.name }
                component="input"
                name={ props.input.name }
                type="radio"
                value={ key }
            />
                { props.options[key] }
            </label>
        )
    }

    let error;
    if( props.meta.touched && props.meta.error ){
        error = <div className="form-error">{ props.meta.error }</div>;
    }

    let warning;
    if( props.meta.touched && props.meta.warning ) {
        warning = (
            <div className="form-warning">{ props.meta.warning }</div>
        );
    }

    return (
        <div className="radio-input">
            <label htmlFor={ props.name }>
                { props.label }
                { error }
                { warning }
            </label>
            { props.options &&
            Object.keys( props.options ).map( renderRadioButtons )}
        </div>
    );

}

export default RadioInput;