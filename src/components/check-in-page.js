import React from 'react';
import CheckInForm from './check-in-form';
import CheckInOrOutResults from './check-in-out-results';

function CheckOutPage(){
    return(
        <div>
            <CheckInForm />
            <CheckInOrOutResults />
        </div>
    );
}

export default CheckOutPage;