import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus, reset } from 'redux-form';

import { doCheckInOrOut } from '../actions/check-in-out';
import { fetchOptions } from '../actions/fetch-options';
import { required, nonEmpty } from '../utils/validators';
import Input from './input';
import RadioInput from './radio-input';
import question from '../images/question.png';
import {showModal } from '../actions/modal';
import '../css/check-out-form.css';

export class CheckOutForm extends React.Component{
    displayError() {
          let modalProps = this.props.hasErrored.message;
          let modalType = 'ERROR_CHECK_MODAL';
          this.props.showModal(modalType, modalProps);
    }

    displayCheckModal(){
        let modalType = 'CHECK_MODAL';
        let modalProps = {
            data: this.props.data,
            checkType: 'check-in'
        };
        return this.props.showModal(modalType, modalProps)
    }

    onSubmit( values ){
        // Fetch data
        return this.props
            .doCheckInOrOut( values, 'check-out' )  
            .then(() => {
                if (this.props.data) {
                    this.displayCheckModal()
                } else if (this.props.hasErrored) {
                    this.displayError()
                }
            })
     }


    render(){
        let info = <div className="tooltip">Employee ID
                    <img src={ question } alt="Question mark" className="icon"/>
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
    options: state.options.options,
    data: state.check.data,
    hasErrored: state.check.error,
    isLoading: state.check.loading,
})

const mapDispatchToProps = ({
    doCheckInOrOut,
    fetchOptions,
    showModal,
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

 
