import React from 'react';
import { shallow } from 'enzyme';
import { LoggedInBar }  from '../../components/logged-in-bar';

describe('<LoggedInBar />', () => {

    it('Renders without crashing', () => {
        shallow(<LoggedInBar />)
   });

   it(`Should fire logOut when clicked`, () => {
        const dispatch = jest.fn();
        const callback = jest.fn();
        const historyMock = { push: jest.fn() }
        const wrapper = shallow(
            <LoggedInBar 
                closeOrUnderline={ callback }
                clearAuth={ dispatch }
                clearAuthToken={ callback }
                history={ historyMock } 
                logOut={ callback }
                underlineOption={ dispatch }
                landing={ dispatch } /> );
        wrapper.instance().logOut();
        expect(dispatch).toHaveBeenCalledTimes(3);
   });

});