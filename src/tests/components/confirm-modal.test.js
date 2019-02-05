import React from 'react';
import { shallow } from 'enzyme';
import { ConfirmModal }  from '../../components/confirm-modal';


describe('<ConfirmModal />', () => {
    const message = "Hello";

    it('Renders without crashing', () => {
        shallow(<ConfirmModal />);
    });

    it('Displays message', () => {
        const wrapper = shallow(<ConfirmModal message={ message } />);
        expect(wrapper.contains(<p>{ message }</p>)).toEqual(true);
    });

    it('Dispatches hideModal on click', () => {
       const callback = jest.fn();
       const dispatch = jest.fn();
       const wrapper = shallow(
            <ConfirmModal 
                message={message}     
                onClose={ callback } 
                hideModal={dispatch} />);
       wrapper.instance().onClose();
       expect(dispatch).toHaveBeenCalledTimes(1);
   });

});