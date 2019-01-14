import React from 'react';
import CheckInForm from './check-in-form';
import CheckInOrOutResults from './check-in-out-results';

function CheckInPage(){
    return(
        <div>
            <CheckInForm />
            <CheckInOrOutResults checkType="checkIn" />
        </div>
    );
}

export default CheckInPage;