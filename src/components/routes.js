import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AccountPage from './account-page';
import AccountResults from './account-results';
import AdvancedSearchPage from './advanced-search-page';
import CheckInPage from './check-in-page';
import CheckOutPage from './check-out-page';
import CreatePage from './create-page';
import Dashboard from './dashboard';
import LandingPage from './landing-page';
import ListPage from './list-page';
import ManagePage from './manage-page';
import NotFound from './not-found';
import ReportsPage from './reports-page';
import SearchPage from './search-page';
import SearchResults from './search-results';
import '../css/routes.css';


class Routes extends React.Component{
    render(){
            
        return(
            <div className="routes">
                <Route path="/advanced-search" component={ AdvancedSearchPage } />
                <Route exact path="/dashboard" component={ Dashboard } />
                <Route exact path="/search" component={ SearchPage } />
                <Route exact path="/welcome" component={ LandingPage } />
                <Route path="/check-in" component={ CheckInPage } />
                <Route path="/check-out" component={ CheckOutPage } />
                <Route path="/results/:option" component={ SearchResults } />
                <Route exact path="/reports" component={ ReportsPage } />
                <Route exact path="/list/:type" component={ ListPage } />
                <Route path="/account" component={ AccountPage } />
                <Route path="/my-account" component={ AccountResults } />
                <Route path="/manage" component={ ManagePage } /> 
                <Route path="/create/:type" component={ CreatePage } />
            </div>
        )
    }
}

export default withRouter(connect()(Routes));

