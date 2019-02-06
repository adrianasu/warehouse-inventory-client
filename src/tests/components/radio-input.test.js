import React from 'react';
import { shallow } from 'enzyme';
import { RadioInput }  from '../../components/radio-input';


describe('<RadioInput />', () => {
    const meta = {
        touched: false,
        error: null
    };

    it('Renders without crashing', () => {
        shallow(<RadioInput meta={ meta } />);
    });

});