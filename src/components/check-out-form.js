import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus, reset } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { doCheckInOrOut } from '../actions/check-in-out';
import { required, nonEmpty } from '../utils/validators';
import Input from './input';
import RadioInput from './radio-input';
import '../css/check-out-form.css';

export class CheckOutForm extends React.Component{
 
    onSubmit( values ){
        return this.props
            .doCheckInOrOut( values, 'check-out' )         
    }


    render(){
        let info = <div className="tooltip">Employee ID<FontAwesomeIcon icon="question-circle" className="space orange"/>
                    <span className="tooltiptext">Employee ID of the person receiving the item</span>
                </div>;
         
        return(
            
            <div className="check-out-form form">
                
                <form
                    onSubmit={ this.props.handleSubmit(values => 
                        this.onSubmit(values))}>
                    
                    <Field 
                        component={ Input } 
                        type="number" 
                        name="barcode" 
                        label="Barcode"
                        validate={[required, nonEmpty]}
                        />
               
                    <Field 
                        component={ Input } 
                        type="number" 
                        name="employeeId" 
                        validate={[required, nonEmpty]}
                        label={info}
                        />
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
                  
                    <button 
                        disabled={this.props.pristine || this.props.submitting}                    
                        type ="submit" >
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

 
