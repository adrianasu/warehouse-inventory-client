import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";

export const CHECK_IN_OR_OUT_RESET = 'CHECK_IN_OR_OUT_RESET';
export const checkInOrOutReset = () => ({
    type: CHECK_IN_OR_OUT_RESET
});

export const CHECK_IN_OR_OUT_BEGIN = 'CHECK_IN_OR_OUT_BEGIN';
export const checkInOrOutBegin = () => ({
    type: CHECK_IN_OR_OUT_BEGIN
});

export const CHECK_IN_OR_OUT_SUCCESS = 'CHECK_IN_OR_OUT_SUCCESS';
export const checkInOrOutSuccess = data => ({
    type: CHECK_IN_OR_OUT_SUCCESS,
    data
});

export const CHECK_IN_OR_OUT_ERROR = 'CHECK_IN_OR_OUT_ERROR';
export const checkInOrOutError = error => ({
    type: CHECK_IN_OR_OUT_ERROR,
    error
});


export const doCheckInOrOut = (values, transactionType) => (dispatch, getState) => {
    dispatch(checkInOrOutBegin());
    const { barcode } = values;
    const authToken = getState().auth.authToken;
    return fetch(`${ API_BASE_URL }/item/${transactionType}/${ barcode }`, {
        method: 'PUT',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( values )
    })
    .then( res => normalizeResponseErrors( res ))
    .then( res => res.json())
    .then( res => {
        dispatch( checkInOrOutSuccess( res ))
    })
    .catch( err => {
        dispatch( checkInOrOutError( err ))
    });
};