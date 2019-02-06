import React from 'react';
import { shallow } from 'enzyme';
import { FilterForm }  from '../../components/filter-form';

describe('<FilterForm />', () => {

    it('Renders without crashing', () => {
        const callback = jest.fn();
        shallow(<FilterForm 
                    handleSubmit={ callback }
                    onChange= { callback }/>);
   });

   it('Renders label text', () => {
        const callback = jest.fn();
        const message = "Enter keyword(s) to filter results.";
        const wrapper = shallow(<FilterForm 
                handleSubmit={ callback }
                onChange= { callback }/>);
        expect(wrapper.text()).toBe(message);
   });

   it(`Should fire handleChange on input change`, () => {
        const value = {value: "m"};
        const e= {target : { value }};   
        const callback = jest.fn();
        const wrapper = shallow(
            <FilterForm 
                value={ value }
                onChange={ callback }
             /> );
        wrapper.instance().handleChange(e);
        expect(callback).toHaveBeenCalledTimes(1);
   });

});