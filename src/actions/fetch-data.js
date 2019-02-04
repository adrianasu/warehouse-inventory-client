import {
    normalizeResponseErrors
} from './utils';
import { generateUrlQuery, formatValues } from '../utils/utils';
import { loadAuthToken } from '../local-storage';

export const FETCH_BEGIN = 'FETCH_BEGIN';
export const fetchBegin = () => ({
    type: FETCH_BEGIN
});

export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const fetchDataSuccess = data => ({
    type: FETCH_DATA_SUCCESS,
    data
});

export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export const fetchDataError = error => ({
    type: FETCH_DATA_ERROR,
    error
});

export const RESET_ERROR = 'RESET_ERROR';
export const resetError = () => ({
    type: RESET_ERROR,
});

export const RESET_DATA = 'RESET_DATA';
export const resetData = () => ({
    type: RESET_DATA,
});


export const fetchData = (data) => (dispatch) => {
    dispatch(fetchBegin());
    let { method, values } = data;
    let route = generateUrlQuery( data );
    if( values ){
        values = formatValues(values);
    }
   
    let jwToken = loadAuthToken();
    
    return fetch(route, {
            method,
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ jwToken }`
                },
            body: JSON.stringify(values)
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(res => {
            dispatch(fetchDataSuccess(res))
        })
        .catch(err => {
            dispatch(fetchDataError(err))
        });
}

