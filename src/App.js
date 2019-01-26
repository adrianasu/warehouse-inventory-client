import React from 'react';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { BrowserRouter as Router } from 'react-router-dom';
import { faCheckCircle, faTimesCircle, faPrint } from '@fortawesome/free-solid-svg-icons';

import ModalContainer from './components/modal-container';
import { refreshAuthToken } from './actions/auth';
import Routes from './components/routes';

library.add( faCheckCircle, faTimesCircle, faPrint );

class App extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000 // One hour
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }
        clearInterval(this.refreshInterval);
    }

    render() {
        return (
            // When modals are shown, hide other components
            <Router>
                <div className="app">
                    { this.props.modalDisabled ? 
                        <Routes />
                        : <ModalContainer /> 
                                        }
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null,
    modalDisabled: state.modal.modalType === null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default connect(mapStateToProps)(App);