import React from 'react';
import { connect } from 'react-redux';
import CheckModal from './check-modal';
import ErrorModal from './error-modal';
import ItemModal from './item-modal';
import LogInModal from './log-in-modal';
import SignUpModal from './sign-up-modal';

const MODAL_COMPONENTS = {
    CHECK_MODAL: CheckModal,
    ERROR_MODAL: ErrorModal,
    ITEM_MODAL: ItemModal,
    LOG_IN_MODAL: LogInModal,
    SIGN_UP_MODAL: SignUpModal,
}

function ModalContainer(props){
    // if there's no modal type specified, return null
    if( !props.modalType ){
        return null;
    }
    // if there's a modal type specified, return that modal
    const SpecificModal = MODAL_COMPONENTS[props.modalType];

    return <SpecificModal />;
}

const mapStateToProps = state => {
    return{
        modalType: state.modal.modalType
    };
};

export default connect( mapStateToProps )( ModalContainer );