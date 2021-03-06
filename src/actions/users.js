import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const signupUser = user => dispatch => {
    return fetch(`${API_BASE_URL}/user`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(normalizeResponseErrors)
        .then(res => res.json())
        .catch(err => {
            const { message } = err;
                return Promise.reject(
                    new SubmissionError({
                        _error: message
                    })
                );
        });
};