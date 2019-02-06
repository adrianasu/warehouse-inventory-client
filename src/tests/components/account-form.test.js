import React from 'react';
import { shallow } from 'enzyme';
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

})