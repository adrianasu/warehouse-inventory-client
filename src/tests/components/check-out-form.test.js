import React from 'react';
import { shallow } from 'enzyme';
import { CheckOutForm } from '../../components/check-out-form';


describe('<CheckOutForm />', () => {

    it('Renders without crashing', () => {
        shallow(<CheckOutForm />);
   });

});