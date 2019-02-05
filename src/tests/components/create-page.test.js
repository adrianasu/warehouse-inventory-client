import React from 'react';
import { shallow } from 'enzyme';
import { CreatePage }  from '../../components/create-page';

const match = {params: { type: 'item'}};
const userType = {params: { type: 'user'}};

describe('<CreatePage />', () => {

    it('Renders without crashing', () => {
        shallow(<CreatePage match={match}/>)
   });

   it('Renders title', () => {
        const wrapper = shallow(<CreatePage match={ match } /> );
        expect(wrapper.contains(<h1>Create New { match.params.type }</h1>)).toEqual(true);
   });

   it(`Dispatches showModal when dataType and redirects to Manage menu is 'user'`, () => {
        const dispatch = jest.fn();
        const callback = jest.fn();
        const historyMock = { push: callback };
        shallow(<CreatePage 
                match={ userType }     
                showModal={ dispatch }
                history={ historyMock } />);
        expect(historyMock.push.mock.calls[0]).toEqual([('/manage')]);
        expect(dispatch).toHaveBeenCalledTimes(1);
   });


});