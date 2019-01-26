import React from 'react';
import { shallow, mount } from 'enzyme';
// Import unconnected version of the component
import { AccountForm } from '../../components/account-form';

describe('<AccountForm />', () => {
    it('Renders without crashing', () => {
        shallow(<AccountForm />);
    });

    it('Renders a form', () => {
        const wrapper = shallow(<AccountForm />);
        expect(wrapper.hasClass("account-form")).toEqual(true);
    });

    // it('Should dispatch fetchData', () => {
        // const dispatch = jest.fn();
        // const fakeEvent = { preventDefault: () => console.log('preventDefault') };
        // const value = 123456;
        // const historyMock = { push: jest.fn() };
        // const wrapper = shallow(<AccountForm 
        //     history={ historyMock }
        //     value={ value } 
        //     dispatch={ dispatch }/>);
        // expect(wrapper.find('.account-form').length).toBe(1);
        // wrapper.find('.account-form').simulate('submit', fakeEvent);
        // const instance = wrapper.instance();
        // instance.fetchData()
        // expect(dispatch).toHaveBeenCalledWith(fetchData(fakeEvent))
    // });

})