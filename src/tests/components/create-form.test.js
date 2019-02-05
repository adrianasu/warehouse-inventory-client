import React from 'react';
import { shallow } from 'enzyme';
import { CreateForm } from '../../components/create-form';

describe('<CreateForm />', () => {
    it('Renders without crashing', () => {
        shallow(<CreateForm />);
    }); 

});