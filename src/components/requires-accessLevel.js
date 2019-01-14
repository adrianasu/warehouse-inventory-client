import React from 'react';
import {connect} from 'react-redux';

export default () => Component => {
    function RequiresAccessLevel() {
        const hasAccessLevel = this.props.hasAccessLevel;
        if (hasAccessLevel) {
            return <Component />;
        }
        return null;
    }

    const displayName = Component.displayName || Component.name || 'Component';
    RequiresAccessLevel.displayName = `RequiresAccessLevel(${displayName})`;

    const mapStateToProps = (state) => ({
        hasAccessLevel: state.auth.currentUser.accessLevel >= 5

    });

    return connect(mapStateToProps)(RequiresAccessLevel);
};