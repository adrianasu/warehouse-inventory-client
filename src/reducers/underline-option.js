import {
    UNDERLINE_OPTION,
} from '../actions/underline-option';

const initialState = {
    activeOption: null
};

export default function underlineReducer(state = initialState, action) {
    if (action.type === UNDERLINE_OPTION) {
        return Object.assign({}, state, {
            activeOption: action.activeOption
        })
    } 
    return state;
}