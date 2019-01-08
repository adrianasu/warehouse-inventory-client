import React from 'react';
import { Link }  from 'react-router-dom';

function ItemsManagement(){
    return(
        <React.Fragment>
            <Link to='/check-in'/>
            <Link to='/check-out' />
        </React.Fragment>
    )
}

export default ItemsManagement;