import React from 'react';
import { shallow } from 'enzyme';
import EditForm from '../../components/edit-form';

describe('<EditForm />', () => {
    it('Renders without crashing', () => {
        shallow(<EditForm />);
    }); 

});