import { SHOW_DETAILS } from '../actions/item';

const InitialState = {
    itemId: null,
}

export default function itemReducer( state = InitialState, action ){
    if( action.type === SHOW_DETAILS ){
        return Object.assign( {}, state, {
            itemId: action.itemId
        })
    }
    return state;
}