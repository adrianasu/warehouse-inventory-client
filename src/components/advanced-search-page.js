import React from 'react';

import AdvancedSearch from './advanced-search';
import SearchResults from './search-results';

function AdvancedSearchPage(){
    return(
        <div>
            <p>Enter or select one or more values to narrow your search.</p>
            <AdvancedSearch />
            {/* <SearchResults />     */}
        </div>
    );
}

export default AdvancedSearchPage;