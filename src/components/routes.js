import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AccountPage from './account-page';
import AdvancedSearchPage from './advanced-search-page';
import CheckInPage from './check-in-page';
import CheckOutPage from './check-out-page';
import CreatePage from './create-page';
import LandingPage from './landing-page';
import ListPage from './list-page';
import ManagePage from './manage-page';
import ReportsPage from './reports-page';
import ScrollToTop from './scroll-to-top';
import SearchPage from './search-page';
import SearchResults from './search-results';
import Home from './home';
import '../css/routes.css';


export class Routes extends React.Component{
    render(){
            
        return(
            <div className="routes">
                <ScrollToTop>
                <Route path="/advanced-search" component={ AdvancedSearchPage } />
                <Route exact path="/search" component={ SearchPage } />
                <Route exact path="/start" component={ LandingPage } />
                <Route path="/check-in" component={ CheckInPage } />
                <Route path="/check-out" component={ CheckOutPage } />
                <Route path="/results/:option" component={ SearchResults } />
                <Route exact path="/reports" component={ ReportsPage } />
                <Route exact path="/list/:type" component={ ListPage } />
                <Route path="/account" component={ AccountPage } />
                <Route path="/my-account" component={ AccountPage } />
                <Route path="/manage" component={ ManagePage } /> 
                <Route exact path="/home" component={ Home } />
                <Route path="/create/:type" component={ CreatePage } />
                </ScrollToTop>
            </div>
        )
    }
}

export default withRouter(connect()(Routes));

