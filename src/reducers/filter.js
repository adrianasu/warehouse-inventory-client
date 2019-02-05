import {
    FILTER_RESET,
    FILTER_RESULTS
} from '../actions/filter';

const initialState = {
    //currentlyDisplayed: [],
    searchTerm: '',
};

export default function filterReducer( state = initialState, action ){
    if (action.type === FILTER_RESULTS) {
        return Object.assign( {}, state, {
            //currentlyDisplayed: action.currentlyDisplayed,
            searchTerm: action.searchTerm,
        })
    } else if (action.type === FILTER_RESET) {
        return Object.assign( {}, state, initialState )
    }
    return state;
}

