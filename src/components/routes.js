import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AdvancedSearchPage from './advanced-search-page';
import CheckInPage from './check-in-page';
import CheckOutPage from './check-out-page';
import Dashboard from './dashboard';
import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import List from './search-results';
import MyAccountPage from './my-account';
import SearchPage from './search-page';
import SearchResults from './search-results';


class Routes extends React.Component{
    render(){
            
            return(
                <div> 
                { this.props.isWelcome ? null :
                <Route path="/" component={ HeaderBar } />
            }
                <Route path="/advancedSearch" component={ AdvancedSearchPage } />
                <Route exact path="/dashboard" component={ Dashboard } />
                {/* <Route exact path="/item" component={ List } /> */}
                <Route path="/my-account" component={ MyAccountPage } />
                <Route exact path="/search" component={ SearchPage } />
                <Route exact path="/welcome" component={ LandingPage } />
                <Route path="/check-in" component={ CheckInPage } />
                <Route path="/check-out" component={ CheckOutPage } />
                <Route exact path="/results" component={ SearchResults } />
                {/* <Route path="/reports" component={ ReportsPage } />
                <Route path="/accounts" component={ AccountsPage } />
                <Route path="/manage" component={ ManagePage } /> */}

            </div>

        )
    }
}

const mapStateToProps = state => ({
    isWelcome: state.welcome.isWelcome,
});

export default withRouter(connect(mapStateToProps)(Routes));

