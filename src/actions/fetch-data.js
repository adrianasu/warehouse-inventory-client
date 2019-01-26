import {
    API_BASE_URL
} from '../config';
import {
    normalizeResponseErrors
} from './utils';
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

function generateUrlQuery( data ){
    let { itemId, dataType, searchType, searchTerm, method } = data;
    let route = [API_BASE_URL];
    
    if( method === 'POST' ){
        return `${ route }/${ dataType }`;
        // If method is PUT or DELETE add id endpoint.
    } else if( method !== 'GET'){
        return `${ route }/${ dataType }/${ itemId }`;
    }
 
    // If we're searching by term add term to url
    if (searchType === "searchTerm") {
        let term = searchTerm.replace(/\W/g, '');
        route.push(`/item/search/${term}`);
    // If we're doing an advanced search, put all
    // terms together in url
    } else if( searchType === "advancedSearch" ){
        route.push(`/item/advanced-search?`);
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
    // Get all 
    } else if (searchType === "searchAll") {
        route.push(`/${searchTerm}`);
    } else if( searchType === "myAccount"){
        route.push(`/my-account/${searchTerm}`)
    } else if (searchType === "on-shelf") {
        route.push(`/item/on-shelf/true`)
    } else if (searchType === "checked-out") {
        route.push(`/item/on-shelf/false`)
    } else if (searchType === "low-stock") {
        route.push(`/product/low-stock`)
    } else if (searchType === "useful-life") {
        route.push(`/item/useful-life`)
    }
    route = route.join("");
    return route;

}

export const fetchData = (data) => (dispatch) => {
    dispatch(fetchBegin());
    let { method, values } = data;
    let route = generateUrlQuery( data );
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

