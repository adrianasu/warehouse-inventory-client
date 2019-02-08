import { LANDING } from '../actions/landing';

const InitialState = {
    isLanding: null
}

export default function landingReducer( state = InitialState, action ){
    if( action.type === LANDING ){
        return Object.assign( {}, state, {
            isLanding: action.isLanding
        })
    }
    return state;
}