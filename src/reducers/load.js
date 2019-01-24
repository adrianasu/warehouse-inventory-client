import { LOAD } from '../actions/load';

const initialState  = {
    data: null
}

export default function loadReducer(state = initialState, action){
    if( action.type === LOAD ){
        return Object.assign( {}, state, {
            data: action.data
        })
    }
    return state;
}