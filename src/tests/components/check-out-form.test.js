import React from 'react';
import { shallow, mount } from 'enzyme';
import { CheckOutForm } from '../../components/check-out-form';


describe('<CheckOutForm />', () => {

    it('Renders without crashing', () => {
        shallow(<CheckOutForm />);
   });


});