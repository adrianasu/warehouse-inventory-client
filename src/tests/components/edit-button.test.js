import React from 'react';
import { mount, shallow } from 'enzyme';
import { EditButton }  from '../../components/edit-button';

describe('<EditButton />', () => {

    it('Renders without crashing', () => {
        shallow(<EditButton />)
   });

   it('Renders "Edit" button name', () => {
       const name = "Edit";
        const wrapper = shallow(<EditButton /> );
        expect(wrapper.text()).toBe(name);
   });

   it(`Dispatches showForm when clicked`, () => {
        const modalProps = { dataType: 'item' };
        modalProps.itemId = 12345;
        const data = [{
            product: 'hammer',
            category: 'tool',
            manufacturer: 'truper'
        }];
        const e = {stopPropagation: jest.fn()};
        const dispatch = jest.fn();
        const callback = jest.fn();
        const wrapper = mount(
            <EditButton 
                e={ e }
                data={ data }
                load={ dispatch }
                modalProps={ modalProps }     
                showForm={ dispatch }
                onClick={ callback } />);
        wrapper.simulate('click');
        expect(dispatch).toHaveBeenCalledTimes(2);
   });


});