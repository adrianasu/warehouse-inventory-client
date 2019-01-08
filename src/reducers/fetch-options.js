import {
    FETCH_OPTIONS_ERROR,
    FETCH_OPTIONS_SUCCESS,
} from '../actions/fetch-options';

const initialState = {
    options: [],
    error: null,
}

export default function optionsReducer( state = initialState, action ){
     if( action.type === FETCH_OPTIONS_SUCCESS ){
        return Object.assign({}, state, {
            options: action.options,
            error: null,
      
        });
    } else if( action.type === FETCH_OPTIONS_ERROR ){
        return Object.assign({}, state, {
            error: action.error,
        });
    }
    return state;
}