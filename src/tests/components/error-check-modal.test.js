import React from 'react';
import { shallow } from 'enzyme';
import { ErrorCheckModal }  from '../../components/error-check-modal';

describe('<ErrorCheckModal />', () => {

    it('Renders without crashing', () => {
        shallow(<ErrorCheckModal />)
   });

   it('Renders error', () => {
        const error = "Error";
        const wrapper = shallow(<ErrorCheckModal hasErrored={ error } /> );
        expect(wrapper.contains(<p>{ error }</p>)).toEqual(true);
   });

   it(`Dispatches onClose when clicked`, () => {
        const error = "Error";
        const dispatch = jest.fn();
        const callback = jest.fn();
        const wrapper = shallow(
            <ErrorCheckModal 
                hasErrored={ error }
                onClose={ callback }
                hideModal={ dispatch }
                checkInOrOutReset={ dispatch } /> );
        wrapper.instance().onClose();
        expect(dispatch).toHaveBeenCalledTimes(2);
   });


});