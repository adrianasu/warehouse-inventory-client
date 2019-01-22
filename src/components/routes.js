import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AccountPage from './account-page';
import AccountResults from './account-results';
import AdvancedSearchPage from './advanced-search-page';
import CheckInPage from './check-in-page';
import CheckOutPage from './check-out-page';
import Dashboard from './dashboard';
import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import ManagePage from './manage-page';
// import List from './list';
import ListPage from './list-page';
import ReportsPage from './reports-page';
import SearchPage from './search-page';
import SearchResults from './search-results';


class Routes extends React.Component{
    render(){
            
            return(
                <div> 
                { this.props.isWelcome ? null :
                <Route path="/" component={ HeaderBar } />
            }
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
                <Route path="/account/:employeeId" component={ AccountResults } />
                <Route path="/my-account" component={ AccountResults } />
                <Route path="/manage" component={ ManagePage } /> 
        
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isWelcome: state.welcome.isWelcome,
});

export default withRouter(connect(mapStateToProps)(Routes));

