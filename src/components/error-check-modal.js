import React from 'react';
import { connect } from 'react-redux';

import { checkInOrOutReset } from '../actions/check-in-out';
import { hideModal }  from '../actions/modal';
import Modal from './modal';
import '../css/modal-item.css';

export class ErrorCheckModal extends React.Component{
    onClose(){
        this.props.checkInOrOutReset();
        this.props.hideModal();
    }

    render(){
        return(
            <Modal onClose={this.onClose.bind(this)}>
                <div>
                    <p>{ this.props.hasErrored }</p>
                </div>
            </Modal>
        )
    }

}

const mapDispatchToProps = {
    hideModal: hideModal,
    checkInOrOutReset: checkInOrOutReset,
};

const mapStateToProps = state => ({
    data: state.search.data,
    hasErrored: state.modal.modalProps,
    modalType: state.modal.modalType,
});

export default connect( mapStateToProps, mapDispatchToProps ) (ErrorCheckModal);
