import React from 'react';
import { Route } from 'react-router-dom';

import AdvancedSearchPage from './advanced-search-page';
import CheckInPage from './check-in-page';
import CheckOutPage from './check-out-page';
import Dashboard from './dashboard';
import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import List from './search-results';
import MyAccount from './my-account';
import SearchPage from './search-page';
import SearchResults from './search-results';


function Routes(){
    return(
        <div> 
            <Route path="/" component={ HeaderBar } />
            <Route exact path="/advancedSearch" component={ AdvancedSearchPage } />
            <Route exact path="/dashboard" component={ Dashboard } />
            <Route exact path="/item" component={ List } />
            <Route exact path="/my-account" component={ MyAccount } />
            <Route exact path="/search" component={ SearchPage } />
            <Route exact path="/results" component={ SearchResults } />
            <Route exact path="/welcome" component={ LandingPage } />
            <Route exact path="/check-in" component={ CheckInPage } />
            <Route exact path="/check-out" component={ CheckOutPage } />
        </div>
    )
}

export default Routes;

