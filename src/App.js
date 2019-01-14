import React from 'react';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';

import ModalContainer from './components/modal-container';
import NonModalContainer from './components/non-modal-container';
import { refreshAuthToken } from './actions/auth';
import { faCheckCircle, faTimesCircle, faPrint } from '@fortawesome/free-solid-svg-icons';

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
            <div className="app">
                { this.props.modalDisabled ? <NonModalContainer />
                                            : <ModalContainer /> 
                }
            </div>
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