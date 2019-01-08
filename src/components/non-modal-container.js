import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from  './routes';

function NonModalContainer(){
    return(
        <div> 
            <Router>
                <Routes />
            </Router>
        </div>
    )
}

export default NonModalContainer;

