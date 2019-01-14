import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loadAuthToken } from './local-storage';
import { setAuthToken, refreshAuthToken } from './actions/auth';
import authReducer from './reducers/auth';
import checkInOrOutReducer from './reducers/check-in-out';
import filterReducer from './reducers/filter';
import modalReducer from './reducers/modal';
import optionsReducer from './reducers/fetch-options';
import protectedDataReducer from './reducers/protected-data';
import queryReducer from './reducers/query-values';
import searchReducer from './reducers/fetch-data';
import welcomeReducer from './reducers/welcome';

const store = createStore(
    combineReducers({
        auth: authReducer,
        check: checkInOrOutReducer,
        filter: filterReducer,
        form: formReducer,
        modal: modalReducer,
        options: optionsReducer,
        protectedData: protectedDataReducer,
        query: queryReducer,
        search: searchReducer,
        welcome: welcomeReducer,
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