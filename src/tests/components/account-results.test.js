import React from 'react';
import { shallow } from 'enzyme';
import { AccountResults } from '../../components/account-results';
//
describe('<AccountResults />', () => {
     let data = {
         employee: {
             firstName: "Name",
             lastName: "Last"
         },
         items: [
             {
                 barcode: 123, 
                 product: {
                    name: 'prod',
                    manufacturer: { 
                        name: 'manufacturer'
                    }, 
                    model: 'abc'
                }, 
                serialNumber: 987,
                checkedOut: [{date: new Date(Date.now())}]
            }]
     }
    it('Renders without crashing', () => {
        shallow(<AccountResults account={data} />);
    });

    it('Renders employee name', () => {
        let name = data.employee.firstName + " " + data.employee.lastName;
        const wrapper = shallow(<AccountResults account={data} />)
        expect(wrapper.contains(<h2>{ name }</h2>)).toEqual(true);
    });

    it(`Renders checked-out items' list`, () => {
        const wrapper = shallow(<AccountResults account={data} />)
        const items = wrapper.find('ol>li');
        expect(items.length).toEqual(data.items.length);
    })
    
})