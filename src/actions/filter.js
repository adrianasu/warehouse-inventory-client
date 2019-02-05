export const FILTER_RESULTS = 'FILTER_RESULTS';
export const filterResults = ( searchTerm ) => ({
    type: FILTER_RESULTS,
    //currentlyDisplayed,
    searchTerm,
})

export const FILTER_RESET = 'FILTER_RESET';
export const filterReset = () => ({
    type: FILTER_RESET
})

