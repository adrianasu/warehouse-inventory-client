import React from 'react';
import { connect } from 'react-redux';

import { hideModal }  from '../actions/modal';

import Modal from './modal';
import '../css/modal-item.css';

export class ConfirmModal extends React.Component{
    onClose(){
        this.props.hideModal();
    }

    render(){

        return(
            <Modal onClose={this.onClose.bind(this)}>
                <div className="item">
                    <p>{ this.props.message }</p>
                </div>
            </Modal>
        )
    }
}

const mapDispatchToProps = {
    hideModal: hideModal,
};

const mapStateToProps = state => ({
    message: state.modal.modalProps.message
});

export default connect( mapStateToProps, mapDispatchToProps ) (ConfirmModal);
