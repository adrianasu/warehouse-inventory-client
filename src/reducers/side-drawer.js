import {
    SIDE_DRAWER_CLOSE,
    SIDE_DRAWER_OPEN
} from '../actions/side-drawer';

const initialState = {
    open: false
};

export default function drawerReducer(state = initialState, action) {
    if (action.type === SIDE_DRAWER_CLOSE) {
        return Object.assign({}, state, {
            open: false
        })
    } else if (action.type === SIDE_DRAWER_OPEN) {
        return Object.assign({}, state, {
            open: true
        })
    } 
    return state;
}