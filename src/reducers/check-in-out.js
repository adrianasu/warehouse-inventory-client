import {
    CHECK_IN_OR_OUT_BEGIN,
    CHECK_IN_OR_OUT_ERROR,
    CHECK_IN_OR_OUT_RESET,
    CHECK_IN_OR_OUT_SUCCESS,
} from '../actions/check-in-out';

const InitialState = {
    data: null,
    error: null,
    loading: false,
}

export default function checkInOrOutReducer( state = InitialState, action ){
    if( action.type === CHECK_IN_OR_OUT_BEGIN ){
        return Object.assign( {}, state, {
            loading: true,
            data: null,
            error: null
        });
    } else if( action.type === CHECK_IN_OR_OUT_SUCCESS ){
        return Object.assign({}, state, {
            data: action.data,
            error: null,
            loading: false,
        });
    } else if( action.type === CHECK_IN_OR_OUT_ERROR ){
        return Object.assign({}, state, {
            data: null,
            error: action.error,
            loading: false,
        });
    } else if (action.type === CHECK_IN_OR_OUT_RESET) {
        return Object.assign({}, state, {
            data: null,
            error: null,
            loading: false,
        });
    }    
    return state;
}