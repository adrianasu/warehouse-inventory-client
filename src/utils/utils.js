import {
    API_BASE_URL
} from '../config';

import {
    ADMIN_ACCESS_LEVEL,
    BASIC_ACCESS_LEVEL,
    OVERVIEW_ACCESS_LEVEL,
    PUBLIC_ACCESS_LEVEL,
} from './list-content';

// Return an array that contains the indexes of
// all uppercase letters found in a string.
export const findUpperCase = aString => {
    let index = [];
    for (let x = 0; x < aString.length; x += 1) {
        if (aString.charAt(x) >= 'A' && aString.charAt(x) <= 'Z') {
            index.push(x);
        }
    }
    return index;
}

// Transform camel case strings into
// readable strings, by adding spaces.
export const addSpace = aString => {
    let idxArray = findUpperCase(aString);
    if (idxArray.length > 0) {
        let startIdx = 0;
        let spacedString = [];
        for (let x = 0; x <= idxArray.length; x += 1) {
            if (x === idxArray.length) {
                spacedString.push(aString.substring(startIdx))
            } else {
                spacedString.push(aString.substring(startIdx, idxArray[x]));
                startIdx = idxArray[x];
            }
        }
        return spacedString.join(" ");
    }
    return aString;
}

// Return date in the sent template or 'MM/DD/YYYY HH:mm:ss' template
export const formatDate = (date = Date.now(), template = 'MM/DD/YYYY HH:mm:ss') => {
    let specs = 'YYYY:MM:DD:HH:mm:ss'.split(':');
    return new Date(date).toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
        return template.split(specs[i]).join(item);
    }, template);
}

export const getItem = ({ data, id }) => {
    let myItem = {};
    data.forEach(item => {
        if (item.id === id) {
            myItem = item;
        }
    });
    return myItem;
}

export const getId = ({ data, value, key }) => {
    let myId;
    data.forEach(item => {
        if (item[key] === value) {
            myId = item.id;
        }
    });
    return myId;
}

export const getRelatedData = dataType => {
    return dataType === 'product' ?
        ['items'] : dataType === 'manufacturer' ?
            ['products'] : dataType === 'department' ?
                ['employees']: dataType === 'category' ?
                    ['products'] : null;
}

const containsValue = value => {
    if (value !== "Select one") {
        return true
    }
    return false;
}

export const formatValues = values => {
    let formatted = {};
    // Transform accessLevel string to its equivalent number.
    if( values.accessLevel ){
       formatted.accessLevel = accessLevelToNumber(values.accessLevel);
    }
    Object.keys(values).forEach(key => {
        // Remove "Select one" values
        if( containsValue(values[key]) ){
            // If value is a string, capitalize it.
            formatted[key] = Number(values[key]) ? values[key] :
                `${values[key].charAt(0).toUpperCase()}${values[key].substring(1)}`;
        } 
    })
   return formatted;
}

export const generateUrlQuery = data => {
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

export const accessLevelToString = aNumber => {
    return aNumber === ADMIN_ACCESS_LEVEL ? "Admin"
        : aNumber === PUBLIC_ACCESS_LEVEL ? "Public"
        : aNumber === OVERVIEW_ACCESS_LEVEL ? "Overview"
        : "Basic";
}

export const accessLevelToNumber = aString => {
    return aString === "Admin" ? ADMIN_ACCESS_LEVEL :
        aString === "Public" ? PUBLIC_ACCESS_LEVEL :
        aString === "Overview" ? OVERVIEW_ACCESS_LEVEL :
        BASIC_ACCESS_LEVEL;
}

export const capitalize = aString =>
    `${aString.charAt(0).toUpperCase()}${aString.substring(1)}`;


export const firstWord = aString => {
    let regex = new RegExp(/[\s\W]/)
    let spaceIdx = aString.search(regex);
    return spaceIdx === -1 ? aString
        : aString.slice(0, spaceIdx);
}