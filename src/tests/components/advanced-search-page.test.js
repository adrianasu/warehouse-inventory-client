import React from 'react';
import { shallow } from 'enzyme';
import AdvancedSearch from '../../components/advanced-search';
import { AdvancedSearchPage } from '../../components/advanced-search-page';

describe('<AdvancedSearchPage />', () => {
    it('Renders without crashing', () => {
        shallow(<AdvancedSearchPage />);
    });

    it('Renders AdvancedSearch form', () => {
        const wrapper = shallow( <AdvancedSearchPage  /> );
        const form = wrapper.find(AdvancedSearch);
        expect(form.length).toEqual(1);
    });

});