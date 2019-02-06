import React from 'react';
import { shallow } from 'enzyme';
import {LoginForm}  from '../../components/log-in-form';

describe('<LoginForm />', () => {
    
    it('Renders without crashing', () => {
        const callback = jest.fn();
        shallow(<LoginForm 
                    handleSubmit={ callback }/>);
   });

});