import React from 'react';
import CheckInForm from './check-in-form';
import CheckInOrOutResults from './check-in-out-results';

function CheckInPage(){
    return(
        <div className="check-in">
            <h1>Check-In</h1>
            <CheckInForm />
            <CheckInOrOutResults checkType="checkIn" />
        </div>
    );
}

export default CheckInPage;