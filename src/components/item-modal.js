import React from 'react';
import { connect } from 'react-redux';
import { hideModal }  from '../actions/modal';
import { hideForm }  from '../actions/show-form';
import ConfirmDelete from './confirm-delete';
import EditForm from './edit-form';
import ModalContent from './modal-content';
import Modal from './modal';
import '../css/modal-item.css';

class ItemModal extends React.Component{
    onClose(){
        this.props.hideModal();
        this.props.hideForm();
    }

    // This modal could display the item's description,
    // or the item's edit or delete form.
    render(){
        return(
            <Modal onClose={this.onClose.bind(this)}>
                <div className="modal-item">
                    { this.props.form === 'EDIT' ?
                        // Send initial values to pre-fill the form
                        <EditForm initialValues={ this.props.initialValues }/>
                        : this.props.form === 'DELETE' ?
                            <ConfirmDelete /> 
                            :<ModalContent />
                    }
                </div>
            </Modal>
        )
    }

}

const mapStateToProps = state => ({
    form: state.showForm.formType,
    // Data is loaded when Edit button is clicked
    initialValues: state.load.data
})

const mapDispatchToProps = ({
    hideModal,
    hideForm
});

export default connect( mapStateToProps, mapDispatchToProps ) (ItemModal);
