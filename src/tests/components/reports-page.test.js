import React from 'react';
import { shallow } from 'enzyme';
import {ReportsPage}  from '../../components/reports-page';

describe('<ReportsPage />', () => {
    
    it('Renders without crashing', () => {
        shallow(<ReportsPage />);
   });

});