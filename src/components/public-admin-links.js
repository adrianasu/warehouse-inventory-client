import React from 'react';
import { connect } from 'react-redux';
import { withRouter }  from 'react-router-dom';
import { closeSideDrawer } from '../actions/side-drawer';
import { underlineOption } from '../actions/underline-option';
import { capitalize } from '../utils/utils';
import checkInIcon from '../images/check-in.png';
import checkOutIcon from '../images/check-out.png';
import userFileIcon from '../images/user-file.png';
import manageIcon from '../images/manage.png';
import reportIcon from '../images/report.png';

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

    handleCheckIn() {
        this.closeOrUnderline('check-in');        
        this.props.history.push(`/check-in`)
    }

    handleCheckOut() {
        this.closeOrUnderline('check-out');
        this.props.history.push(`/check-out`)
    }

    handleAccount() {
        this.closeOrUnderline('account');
        this.props.history.push(`/account`);
    }

     handleReports() {
         this.closeOrUnderline('reports');
         this.props.history.push(`/reports`);
     }

      handleManage() {
          this.closeOrUnderline('manage');
          this.props.history.push(`/manage`);
      }

    render(){
        const options = [
            {name: 'check-in', icon: checkInIcon, handleClick: this.handleCheckIn.bind(this)},
            {name: 'check-out', icon: checkOutIcon , handleClick: this.handleCheckOut.bind(this)},
            {name: 'account', icon: userFileIcon , handleClick: this.handleAccount.bind(this)}, 
            {name: 'manage', icon: manageIcon , handleClick: this.handleManage.bind(this)},
            {name: 'reports', icon: reportIcon , handleClick: this.handleReports.bind(this)},
        ];
        
        
        let buttons = options.map(option =>
            <li key={option.name} className="tooltip">
                <button 
                    value={option.name} 
                    className={this.props.activeOption === option.name ? "show-active" : null}
                    onClick={ option.handleClick }>
                    <span className="tooltiptext">{ capitalize(option.name) }</span>
                    <img src={ option.icon } alt="icon" className="header-icon"/>                    
                    {
                        this.props.fromSideDrawer ? `  ${option.name}` : ''
                    }
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