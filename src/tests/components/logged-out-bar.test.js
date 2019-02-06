import React from 'react';
import { shallow } from 'enzyme';
import { LoggedOutBar }  from '../../components/logged-out-bar';

describe('<LoggedOutBar />', () => {

    it('Renders without crashing', () => {
        shallow(<LoggedOutBar />)
   });

   it(`Should fire signUp when clicked`, () => {
        const dispatch = jest.fn();
        const callback = jest.fn();
        const wrapper = shallow(
            <LoggedOutBar 
                closeOrUnderline={ callback }
                showModal={ dispatch }
                underlineOption={ dispatch }
                closeSideDrawer={ dispatch } /> );
        wrapper.instance().signUp();
        expect(dispatch).toHaveBeenCalledTimes(2);
   });


});