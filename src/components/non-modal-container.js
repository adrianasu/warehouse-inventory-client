import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import InRouter from  './in-router';

export class NonModalContainer extends React.Component{
    render(){
        return(
                <Router>
                    <InRouter history={this.props.history} />
                </Router>
        )
    }
}

export default NonModalContainer;

