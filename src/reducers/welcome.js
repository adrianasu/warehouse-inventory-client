import { WELCOME } from '../actions/welcome';

const InitialState = {
    isWelcome: null
}

export default function welcomeReducer( state = InitialState, action ){
    if( action.type === WELCOME ){
        return Object.assign( {}, state, {
            isWelcome: action.isWelcome
        })
    }
    return state;
}