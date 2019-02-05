import React from 'react';
import { shallow } from 'enzyme';
import { FilterForm }  from '../../components/filter-form';

describe('<FilterForm />', () => {

    it('Renders without crashing', () => {
        shallow(<FilterForm />)
   });

   it('Renders error', () => {
        const error = "Error";
        const wrapper = shallow(<FilterForm hasErrored={ error } /> );
        expect(wrapper.contains(<p>{ error }</p>)).toEqual(true);
   });

   it(`Dispatches onClose when clicked`, () => {
        const error = "Error";
        const dispatch = jest.fn();
        const callback = jest.fn();
        const wrapper = shallow(
            <FilterForm 
                hasErrored={ error }
                onClose={ callback }
                hideModal={ dispatch } /> );
        wrapper.instance().onClose();
        expect(dispatch).toHaveBeenCalledTimes(1);
   });

});