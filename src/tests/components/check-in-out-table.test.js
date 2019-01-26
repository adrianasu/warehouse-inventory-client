import React from 'react';
import { shallow, mount } from 'enzyme';
import CheckInOutTable from '../../components/check-in-out-table';

const data = {
    data: {
        barcode: 123,
        product: 'MyProduct',
        warehouse: 'Big Warehouse',
        checkedIn: [{
            employee: {
                firstName: 'In',
                lastName: 'Last',
            },
            date: new Date(Date.now()),
            authorizedBy: {
                firstName: 'Boss',
                lastName: 'Name'
            }
        }],
        checkedOut: [{
            employee: {
                firstName: 'Out',
                lastName: 'Last',
            },
            date: new Date(Date.now()),
            authorizedBy: {
                firstName: 'Boss',
                lastName: 'Name'
            }
        }]
    }
}


describe('<CheckInOutTable />', () => {

    it('Renders check-out data', () => {
        data.checkType = 'checkOut';
        const wrapper = shallow(<CheckInOutTable data={ data } />);
        expect(wrapper.find('th').text().toLowerCase()).toEqual('check out');
   });
    
   it('Renders check-in data', () => {
        data.checkType = 'checkIn';
        const wrapper = shallow(<CheckInOutTable data={ data } />);
        expect(wrapper.find('th').text().toLowerCase()).toEqual('check in');
   });  

});