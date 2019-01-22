import { HIDE_FORM, SHOW_FORM } from '../actions/show-form';

const initialState = {
    formProps: null,
    formType: null,
}

export default function showFormReducer(state = initialState, action) {
    if (action.type === SHOW_FORM) {
        return Object.assign({}, state, {
            formProps: action.formProps,
            formType: action.formType,
        })
    } else if (action.type === HIDE_FORM) {
        return Object.assign({}, state, initialState)
    }
    return state;
}
