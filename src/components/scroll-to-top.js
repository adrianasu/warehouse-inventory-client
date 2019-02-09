import React from 'react';
import { withRouter } from 'react-router-dom';

// Component that scrolls to top on a route change
class ScrollToTop extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            // never triggered
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);