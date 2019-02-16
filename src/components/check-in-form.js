import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus, reset } from 'redux-form';

import { doCheckInOrOut } from '../actions/check-in-out';
import { fetchOptions } from '../actions/fetch-options';
import Input from './input';
import Loader from './loader';
import question from '../images/question.png';
import { required, nonEmpty } from '../utils/validators';
import {showModal } from '../actions/modal';
import '../css/check-in-form.css';


class CheckInForm extends React.Component{

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
        return this.props.doCheckInOrOut( values, 'check-in' )
            .then(() => {
                if( this.props.data ) {
                    this.displayCheckModal()
                }else if( this.props.hasErrored ){
                    this.displayError()
                }
            })
    }

    render(){
           let info = <div className="tooltip">Employee ID
                    <img src={ question } alt="Question mark" className="icon"/>
                    <span className="tooltiptext">Employee ID of the person returning the item</span>
                </div>;

        return(
            <div className="check-in-form form">
                <form
                    onSubmit={ this.props.handleSubmit(values => 
                        this.onSubmit(values))}>
                    
                    <Field 
                        component={ Input } 
                        type="number" 
                        name="barcode" 
                        label="Barcode"
                        validate={[required, nonEmpty]}/>
                    <Field 
                        component={ Input } 
                        type="number" 
                        name="employeeId" 
                        label={ info }
                        validate={[required, nonEmpty]}/>
                    { 
                        this.props.isLoading ? <Loader/>
                    :<button 
                        disabled={this.props.pristine || this.props.submitting}
                        type ="submit" >
                        Check In
                    </button>
                    }
                </form>  
                </div>        
          );
    }
}
  
const mapStateToProps = state => ({
    options: state.options.options,
    data: state.check.data,
    isLoading: state.check.loading === true,
    hasErrored: state.check.error
})

const mapDispatchToProps = ({
    doCheckInOrOut,
    fetchOptions,
    showModal,
});

CheckInForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckInForm);

export default reduxForm({
    form: 'checkOut',
    onSubmitSuccess: (result, dispatch) =>
        dispatch( reset('checkOut')),
    onSubmitFail: ( errors, dispatch ) =>
        dispatch( focus( 'checkOut', Object.keys(errors)[0]))
}) (CheckInForm);

 
