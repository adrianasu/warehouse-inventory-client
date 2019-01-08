export const SAVE_QUERY_VALUES = 'SAVE_QUERY_VALUES';
export const saveQueryValues = (values) => ({
    type: SAVE_QUERY_VALUES,
    values
});

export const DELETE_QUERY_VALUES = 'DELETE_QUERY_VALUES';
export const deleteQueryValues = () => ({
    type: DELETE_QUERY_VALUES
});