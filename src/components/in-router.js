import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Backdrop from './backdrop';
import { closeSideDrawer, openSideDrawer } from '../actions/side-drawer';
import HeaderBar from './header-bar';
import SideDrawer from './side-drawer';
import Routes from './routes';

export class InRouter extends React.Component{
   
    // To open and close SideDrawer in mobile.
    drawerOpenClickHandler(){
        this.props.openSideDrawer();
    }

    // When Backdrop is clicked, the SideDrawer 
    // will close.
    backdropClickHandler(){
        this.props.closeSideDrawer();
    }

    render(){
        let backdrop;

        if( this.props.isDrawerOpen ){
            backdrop = <Backdrop backdropClickHandler={this.backdropClickHandler.bind(this)}/>;
        }

        return(
            <div>
                { this.props.isWelcome ? null :
                    <React.Fragment>
                        <HeaderBar drawerOpenClickHandler={this.drawerOpenClickHandler.bind(this)}/>
                        <SideDrawer show={this.props.sideDrawerOpen} history={this.props.history}/>
                        { backdrop }
                    </React.Fragment>
                }
              
                <Routes />
             
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isWelcome: state.welcome.isWelcome,
    isDrawerOpen: state.sideDrawer.open === true,
    sideDrawerOpen: state.sideDrawer.open
});

const mapDispatchToProps = ({
    closeSideDrawer,
    openSideDrawer
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InRouter));

