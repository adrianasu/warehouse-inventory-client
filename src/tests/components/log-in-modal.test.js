import React from 'react';
import { shallow } from 'enzyme';
import { LogInModal }  from '../../components/log-in-modal';

describe('<LogInModal />', () => {

    it('Renders without crashing', () => {
        shallow(<LogInModal />)
    });

    it(`Dispatches onClose when clicked`, () => {
        const dispatch = jest.fn();
        const callback = jest.fn();
        const wrapper = shallow(
            <LogInModal 
                onClose={ callback }
                hideModal={ dispatch } /> );
        wrapper.instance().onClose();
        expect(dispatch).toHaveBeenCalledTimes(1);
   });

});