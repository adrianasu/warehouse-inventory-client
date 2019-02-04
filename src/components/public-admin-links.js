import React from 'react';
import { connect } from 'react-redux';
import { withRouter }  from 'react-router-dom';
import { closeSideDrawer } from '../actions/side-drawer';
import { underlineOption } from '../actions/underline-option';

export class PublicAdminLinks extends React.Component{
    closeOrUnderline(option) {
        // If click comes from side drawer, close it.
        if (this.props.fromSideDrawer) {
            this.props.closeSideDrawer();
            // If click comes from header-bar, underline
            // selected option.
        } else {
            this.props.underlineOption(option);
        }
    }

    handleClick(e) {
        this.closeOrUnderline(e.target.value);        
        this.props.history.push(`/${e.target.value}`)
    }
    render(){
        let options = ['check-in', 'check-out', 'account', 'reports', 'manage'];
        let buttons = options.map(option =>
            <li key={option}>
                <button 
                    value={option} 
                    className={this.props.activeOption === option ? "show-active" : null}
                    onClick={this.handleClick.bind(this) }>
                    { option }
                </button>
            </li>
        );
        return(
            <React.Fragment>
                { buttons }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    activeOption: state.underline.activeOption
});

const mapDispatchToProps = ({
    closeSideDrawer,
    underlineOption    
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PublicAdminLinks));