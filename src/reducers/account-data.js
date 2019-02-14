import { 
    SAVE_ACCOUNT_DATA, 
    DELETE_ACCOUNT_DATA 
} from '../actions/account-data';

const initialState  = {
    data: null
}

export default function accounDataReducer(state = initialState, action){
    if( action.type === SAVE_ACCOUNT_DATA ){
        return Object.assign( {}, state, {
            data: action.data
        })
    } else if (action.type === DELETE_ACCOUNT_DATA) {
        return Object.assign({}, state, {
            data: null
        })
    }
    return state;
}