import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loadAuthToken } from './local-storage';
import { setAuthToken, refreshAuthToken } from './actions/auth';
import accountReducer from './reducers/account-data';
import authReducer from './reducers/auth';
import checkInOrOutReducer from './reducers/check-in-out';
import landingReducer from './reducers/landing';
import loadReducer from './reducers/load';
import modalReducer from './reducers/modal';
import optionsReducer from './reducers/fetch-options';
import queryReducer from './reducers/query-values';
import searchReducer from './reducers/fetch-data';
import sideDrawerReducer from './reducers/side-drawer';
import showFormReducer from './reducers/show-form';
import underlineReducer from './reducers/underline-option';

const store = createStore(
    combineReducers({
        account: accountReducer,
        auth: authReducer,
        check: checkInOrOutReducer,
        form: formReducer,
        load: loadReducer,
        modal: modalReducer,
        options: optionsReducer,
        query: queryReducer,
        search: searchReducer,
        sideDrawer: sideDrawerReducer,
        showForm: showFormReducer,
        underline: underlineReducer,
        landing: landingReducer,
    }), composeWithDevTools(
    applyMiddleware(thunk)),
);

// Hydrate the authToken from localStorage if it exists
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;