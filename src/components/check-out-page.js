import React from 'react';
import CheckOutForm from './check-out-form';
import CheckInOrOutResults from './check-in-out-results';

export default function CheckOutPage(){
    return(
        <div>
            <CheckOutForm />
            <CheckInOrOutResults checkType="checkOut"/>
        </div>
    );
}