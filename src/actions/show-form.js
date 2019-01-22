export const SHOW_FORM = 'SHOW_FORM';
export const showForm = ( formType, formProps ) => ({
    type: SHOW_FORM,
    formProps,
    formType,
})

export const HIDE_FORM = 'HIDE_FORM';
export const hideForm = () => ({
    type: HIDE_FORM
})

