import React from 'react';
import { shallow, mount } from 'enzyme';
import { CheckInOrOutResults } from '../../components/check-in-out-results';

describe('<CheckInOrOutResults />', () => {
    it('Renders without crashing', () => {
        shallow(<CheckInOrOutResults />);
    });
    
    it('Displays "Loading" message', () => {
        const loading = true;
        const wrapper = shallow( <CheckInOrOutResults isLoading={loading} /> );
        const loader = wrapper.find('.loader');
        expect(loader.text()).toEqual("...Loading")
    });

    it('Shows modal with check-in results', () => {
        const callback = jest.fn();
        const dispatch = jest.fn();
        const data = { myData: 'Hello' }
        const checkType='checkIn';
        const modalType = 'CHECK_MODAL';
        mount( <CheckInOrOutResults 
            data={data} 
            checkType={checkType}
            displayCheck={callback}
            showModal={dispatch} /> );
        expect(dispatch).toHaveBeenCalledWith(modalType, {data, checkType});

    });

     it('Shows modal with Error', () => {
        const callback = jest.fn();
        const dispatch = jest.fn();
        const modalType = 'ERROR_CHECK_MODAL';
        const wrapper = mount( <CheckInOrOutResults 
            hasErrored={null} 
            displayError={callback}
            showModal={dispatch} /> );
        // The modal is fired in the componentDidUpdate
        // lifecycle method, so we update our props.
        const hasErrored = {
            message: 'Error'
        };
        wrapper.setProps({ hasErrored });
        expect(dispatch).toHaveBeenCalledWith(modalType, hasErrored.message);
    });
   
    

});