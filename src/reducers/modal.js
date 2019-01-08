import {
    SHOW_MODAL,
    HIDE_MODAL
} from '../actions/modal';

const initialState = {
    modalProps: '',
    modalType: null,
};

export default function modalReducer( state = initialState, action ){
    if( action.type === SHOW_MODAL ){
        return Object.assign( {}, state, {
            modalProps: action.modalProps,
            modalType: action.modalType,
        })
    } else if( action.type === HIDE_MODAL ){
        return Object.assign( {}, state, initialState )
    }
    return state;
}

