import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { showModal } from '../actions/modal';

import CreateForm from './create-form';
import '../css/create-page.css';

class CreatePage extends React.Component{
componentDidMount() {
    // Make sure the options are available in
    // the store for the Select component.
    if (this.props.options === null) {
        return this.props.fetchOptions()
    }
    let dataType = this.props.match.params.type;
    // Do not allow the route create/user
    if (dataType === 'user') {
        this.props.showModal('CONFIRM_MODAL', {
            message: `To create a new user using a different employeeId, log out and go to 'Sign Up'.`
        })
        return this.props.history.push('/manage')
    }
}
   

    render(){
        let dataType = this.props.match.params.type;
        return(
            <div className="create-page">
                <h1>New { dataType } </h1>
                <CreateForm dataType={ dataType } />
            </div>
        )
    }
}

const mapDispatchToProps = ({
    showModal,
})

export default withRouter(connect( null, mapDispatchToProps ) ( CreatePage ));