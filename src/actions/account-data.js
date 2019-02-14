export const SAVE_ACCOUNT_DATA = "SAVE_ACCOUNT_DATA";
export const saveAccountData = data => ({
    type: SAVE_ACCOUNT_DATA,
    data
})

export const DELETE_ACCOUNT_DATA = "DELETE_ACCOUNT_DATA";
export const deleteAccountData = data => ({
    type: DELETE_ACCOUNT_DATA,
})