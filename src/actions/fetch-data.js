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

function generateUrlQuery(searchTerm, searchType){
    let route = [API_BASE_URL];
    // If we're searching by term add term to url
    if (searchType === "searchTerm") {
        let term = searchTerm.replace(/\W/g, '');
        route.push(`/item/search/${term}`);
    // If we're doing an advanced search, put all
    // terms together in url
    } else if( searchType === "advancedSearch" ){
        route.push(`/item/advancedSearch?`);
        Object.keys(searchTerm).forEach( (term, key)  => {
            // Don't include in our query the "Select one" term
            if( searchTerm[term] !== "Select one" ){
                let t = searchTerm[term].replace(/\W/g, '');
                // Include "&" in url after the first query
                key === 0 ? 
                route.push(`${term}=${t}`):
                route.push(`&${term}=${t}`)
            }
        })
    // Get all items
    } else if (searchType === "searchAll") {
        route.push(`/item`);
    } else if( searchType === "myAccount"){
        route.push(`/my-account/${searchTerm}`)
    } else if (searchType === "onShelf") {
        route.push(`/item/onShelf/${searchTerm}`)
    }
    route = route.join("");
    return route;

}

export const fetchData = (searchTerm, searchType) => (dispatch) => {
    dispatch(fetchBegin());
    let route = generateUrlQuery( searchTerm, searchType );

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
}