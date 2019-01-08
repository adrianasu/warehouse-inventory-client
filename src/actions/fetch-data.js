import {
    API_BASE_URL
} from '../config';
import {
    normalizeResponseErrors
} from './utils';

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

export const fetchData = (searchTerm, searchType) => (dispatch) => {
    let route = [API_BASE_URL];
    dispatch(fetchBegin());
    // if we're searching by term add term to url
    if (searchType === "searchTerm") {
        route.push(`/item/search/${searchTerm}`);
    // if we're doing an advanced search, put all
    // terms together in url
    } else if( searchType === "advancedSearch" ){
        route.push(`/item/advancedSearch?`);
        Object.keys(searchTerm).forEach( (term, key)  => {
            key === 0 ?
             route.push(`${term}=${searchTerm[term]}`) :
             route.push(`&${term}=${searchTerm[term]}`)
        })
    } else if (searchType === "searchAll") {
        route.push(`/item`);
    }
    route = route.join("");
    return fetch(route, {
            method: 'GET'
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(res => {
            dispatch(fetchDataSuccess(res))
        })
        .catch(err => {
            dispatch(fetchDataError(err))
        });
};