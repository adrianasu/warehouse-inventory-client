import React from 'react';
import { connect } from 'react-redux';

import { resetError }  from '../actions/fetch-data';
import { hideModal }  from '../actions/modal';

import Modal from './modal';
import '../css/modal-item.css';

class ErrorModal extends React.Component{
    onClose(){
        this.props.resetError();
        this.props.hideModal();
    }

    render(){
 
        return(
            <Modal onClose={this.onClose.bind(this)}>
                <div className="item">
                    <p>{ this.props.hasErrored ? 
                        this.props.hasErrored.message : null }</p>
                </div>
            </Modal>
        )
    }

}

const mapDispatchToProps = {
    hideModal: () => hideModal(),
    resetError: () => resetError()
};

const mapStateToProps = state => ({
    data: state.search.data,
    hasErrored: state.search.error,
});

export default connect( mapStateToProps, mapDispatchToProps ) (ErrorModal);
