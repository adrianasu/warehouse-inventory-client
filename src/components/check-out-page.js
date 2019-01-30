import React from 'react';
import CheckOutForm from './check-out-form';
import CheckInOrOutResults from './check-in-out-results';

function CheckOutPage(){
    return(
          <div className="check-out">
            <h1>Check-Out</h1>
            <CheckOutForm />
            <CheckInOrOutResults checkType="checkOut"/>
        </div>
    );
}

export default CheckOutPage;