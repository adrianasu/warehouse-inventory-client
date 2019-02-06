import React from 'react';
import { mount, shallow } from 'enzyme';
import { DeleteButton }  from '../../components/delete-button';

describe('<DeleteButton />', () => {

    it('Renders without crashing', () => {
        shallow(<DeleteButton />)
   });

   it('Renders "Delete" button name', () => {
       const name = "Delete";
        const wrapper = shallow(<DeleteButton /> );
        expect(wrapper.text()).toBe(name);
   });

   it(`Dispatches showForm when clicked`, () => {
        const modalProps = { dataType: 'item' };
        modalProps.itemId = 12345;
        const e = {stopPropagation: jest.fn()};
        const dispatch = jest.fn();
        const callback = jest.fn();
        const wrapper = mount(
            <DeleteButton 
                e={ e }
                modalProps={ modalProps }     
                showForm={ dispatch }
                onClick={ callback } />);
        wrapper.simulate('click');
        expect(dispatch).toHaveBeenCalledTimes(1);
   });

});