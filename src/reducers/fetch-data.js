import {
    FETCH_BEGIN,
    FETCH_DATA_ERROR,
    FETCH_DATA_SUCCESS,
    RESET_ERROR
} from '../actions/fetch-data';

const initialState = {
    data: [],
    error: null,
    loading: false
}

export default function searchReducer( state = initialState, action ){
    if( action.type === FETCH_BEGIN ){
        return Object.assign({}, state, {
            error: null,
            loading: true,
        });
    } else if( action.type === FETCH_DATA_SUCCESS ){
        return Object.assign({}, state, {
            data: action.data,
            error: null,
            loading: false
        });
    } else if( action.type === FETCH_DATA_ERROR ){
        return Object.assign({}, state, {
            error: action.error,
            loading: false
        });
    } else if( action.type === RESET_ERROR){
        return Object.assign({}, state, {
            error: null,
        })
    }
    return state;
}