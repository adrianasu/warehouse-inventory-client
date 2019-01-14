import React from 'react';
import { connect } from 'react-redux';

import { resetError } from '../actions/reset-error';
import { hideModal }  from '../actions/modal';

import Modal from './modal';
import '../css/modal-item.css';

class ErrorModal extends React.Component{
    onClose(){
        this.props.hideModal();
    }

    render(){
 
        return(
            <Modal onClose={this.onClose.bind(this)}>
                <div className="item">
                    <p>{ this.props.hasErrored }</p>
                </div>
            </Modal>
        )
    }

}

const mapDispatchToProps = {
    hideModal: hideModal,
    resetError: resetError,
};

const mapStateToProps = state => ({
    data: state.search.data,
    hasErrored: state.modal.modalProps,
    modalType: state.modal.modalType,
});

export default connect( mapStateToProps, mapDispatchToProps ) (ErrorModal);
