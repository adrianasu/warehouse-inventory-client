import { RESET_ERROR } from '../actions/reset-error';

const InitialState = {
    error: null
}

export default function resetReducer(state = InitialState, action ){
    if( action.type === RESET_ERROR ){
        return Object.assign({}, state, InitialState);
    }
    return state;
}