import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { showModal } from '../actions/modal';
import Input from './input';
import RadioInput from './radio-input';
import Select from './select';
import { getCreateFields, isInput, isSelect, isCheck, whatType, validateThis } from '../utils/form-content';
import { addSpace } from '../utils/utils';
import { requiredSelect } from '../utils/validators';
import { Field } from 'redux-form';

import CreateForm from './create-form';
import '../css/create-page.css';
//
export class CreatePage extends React.Component{

        generateField( field ){
        let valType = whatType(field);
        let validateField = validateThis(field)
        return isInput(field) ?
                <Field component={ Input } 
                    type={ valType} 
                    name={field} 
                    key={ field } 
                    label={addSpace(field)}
                    validate={ validateField }
                    />
                : isSelect(field) ?
                    <Field component={ Select } 
                        type={ valType } 
                        name={field} 
                        key={ field } 
                        label={addSpace(field)}
                        validate={ [requiredSelect] }
                        />
                    : isCheck(field) ?
                        <Field 
                            component={ RadioInput } 
                            name={field} key={ field }
                            label={field} 
                            options={ { false: "false", true: "true"}} />
                        : null;
    }

    createFields(dataType){
        // Depending on the dataType get the fields for
        // the create form.
        let createFields = getCreateFields(dataType);
        let fields = [];
        if( createFields ){
            createFields.forEach( field => {
                fields.push(this.generateField(field))
            })
        }
      
        return fields;
    }
    
    componentDidMount() {
        // Make sure the options are available in
        // the store for the Select component.
        if (this.props.options === null) {
            return this.props.fetchOptions()
        }
        let dataType = this.props.match.params.type;
        // Do not allow the route create/user
        if (dataType === 'user') {
            this.props.showModal('CONFIRM_MODAL', {
                message: `To create a new user using a different employeeId, log out and go to 'Sign Up'.`
            })
            return this.props.history.push('/manage')
        }
    }
   

    render(){
        let dataType = this.props.match.params.type;
        let fields = this.createFields(dataType);
        return(
            <div className="create-page">
                <h1>New { dataType } </h1>
                <CreateForm 
                    dataType={ dataType } 
                    fields={ fields }/>
            </div>
        )
    }
}

const mapDispatchToProps = ({
    showModal,
})

export default withRouter(connect( null, mapDispatchToProps ) ( CreatePage ));