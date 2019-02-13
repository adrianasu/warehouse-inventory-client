import {
    API_BASE_URL
} from '../config';
import {
    normalizeResponseErrors
} from './utils';

export const FETCH_OPTIONS_BEGIN = 'FETCH_OPTIONS_BEGIN';
export const fetchOptionsBegin = () => ({
    type: FETCH_OPTIONS_BEGIN
});

export const FETCH_OPTIONS_SUCCESS = 'FETCH_OPTIONS_SUCCESS';
export const fetchOptionsSuccess = options => ({
    type: FETCH_OPTIONS_SUCCESS,
    options
});

export const FETCH_OPTIONS_ERROR = 'FETCH_OPTIONS_ERROR';
export const fetchOptionsError = error => ({
    type: FETCH_OPTIONS_ERROR,
    error
});

export const DELETE_OPTIONS = 'DELETE_OPTIONS';
export const deleteOptions = () => ({
    type: DELETE_OPTIONS
});

export const fetchOptions = () => (dispatch) => {
    dispatch(fetchOptionsBegin());
    return fetch(`${ API_BASE_URL }/searchableFields`, {
            method: 'GET'
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(res => {
            dispatch(fetchOptionsSuccess(res))
        })
        .catch(err => {
            dispatch(fetchOptionsError(err))
        });

};