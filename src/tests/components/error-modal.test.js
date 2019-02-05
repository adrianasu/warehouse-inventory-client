import React from 'react';
import { shallow } from 'enzyme';
import { ErrorModal }  from '../../components/error-modal';

describe('<ErrorModal />', () => {

    it('Renders without crashing', () => {
        shallow(<ErrorModal />)
   });

   it('Renders error', () => {
        const error = "Error";
        const wrapper = shallow(<ErrorModal hasErrored={ error } /> );
        expect(wrapper.contains(<p>{ error }</p>)).toEqual(true);
   });

   it(`Dispatches onClose when clicked`, () => {
        const error = "Error";
        const dispatch = jest.fn();
        const callback = jest.fn();
        const wrapper = shallow(
            <ErrorModal 
                hasErrored={ error }
                onClose={ callback }
                hideModal={ dispatch } /> );
        wrapper.instance().onClose();
        expect(dispatch).toHaveBeenCalledTimes(1);
   });

});