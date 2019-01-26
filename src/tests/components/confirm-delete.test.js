import React from 'react';
import { shallow } from 'enzyme';
import { ConfirmDelete } from '../../components/confirm-delete';
import { fetchData } from '../../actions/fetch-data';

const mockFetchDataAction = {
    type: 'FETCH_DATA'
};
jest.mock('../../actions/fetch-data', () => Object.assign({},
    require.requireActual('../../actions/fetch-data'),
    {
        fetchData: jest.fn().mockImplementation(() => {
            return mockFetchDataAction;
        })
    }
));

describe('<ConfirmDelete />', () => {

    it('Renders without crashing', () => {
        shallow(<ConfirmDelete />);
    });

    // it ('Dispatches fetchData when "Delete" button is clicked', () =>{
    //     const dispatch = jest.fn();
    //     const callback = jest.fn();
    //     const wrapper = shallow( <ConfirmDelete 
    //         //handleDelete={ callback}
    //         fetchData={ dispatch } 
    //         /> );
    //     dispatch.mockClear();
    //     const instance = wrapper.instance();
    //     instance.handleDelete();
    //     dispatch.fetchData();
    //     expect(dispatch).toHaveBeenCalledWith(mockFetchDataAction)
        
         
    // });


});