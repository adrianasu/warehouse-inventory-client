import React from 'react';
import { HeaderOptions } from './header-options';
import '../css/side-drawer.css';
import { connect } from 'react-redux';
import { closeSideDrawer } from '../actions/side-drawer';


export class SideDrawer extends React.Component{
 render(){
    let drawerClasses = 'side-drawer';
    // props.show passed from parent
    // at InRouter component
    if(this.props.show){
        // To show the SideDrawer we
        // add an 'open' css class
        drawerClasses = 'side-drawer open';
    }
    return(
        <nav className={ drawerClasses }>
            <HeaderOptions 
                // Let HeaderOptions know that it
                // will be displayed on SideDrawer (mobile)
                fromSideDrawer={ true } 
                history={ this.props.history } 
                closeSideDrawer={this.props.closeSideDrawer }
                loggedIn={ this.props.loggedIn }
                />
        </nav>
    )
 }
}

const mapDispatchToProps = ({
    closeSideDrawer
})

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);