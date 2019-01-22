import {
    FETCH_OPTIONS_BEGIN,
    FETCH_OPTIONS_ERROR,
    FETCH_OPTIONS_SUCCESS,
} from '../actions/fetch-options';

const initialState = {
    error: null,
    loading: false,
    options: null,
}

export default function optionsReducer( state = initialState, action ){
     if( action.type === FETCH_OPTIONS_SUCCESS ){
        return Object.assign({}, state, {
            options: action.options,
            error: null,
            loading: false,
      
        });
    } else if( action.type === FETCH_OPTIONS_ERROR ){
        return Object.assign({}, state, {
            error: action.error,
            loading: false,
        });
    } else if (action.type === FETCH_OPTIONS_BEGIN) {
        return Object.assign({}, state, {
            loading: true,
        });
    }
    return state;
}