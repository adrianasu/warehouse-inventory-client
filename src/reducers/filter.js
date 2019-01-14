import { SET_FILTER } from '../actions/filter';

const InitialState = {
    searchTerm: ''
};

export default function filterReducer( state = InitialState, action ){
    if( action.type === SET_FILTER ){
        return Object.assign( {}, state, {
            searchTerm: action.searchTerm
        })
    }
    return state;
}