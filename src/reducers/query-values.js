import { SAVE_QUERY_VALUES, DELETE_QUERY_VALUES } from '../actions/query-values';

const InitialState = {
    values: null,
}

export default function queryReducer( state = InitialState, action ){
    if( action.type === SAVE_QUERY_VALUES ){
        return Object.assign( {}, state, {
            values: action.values
        })
    } else if( action.type === DELETE_QUERY_VALUES ){
        return Object.assign( {}, state, InitialState )
    }
    return state;   
}