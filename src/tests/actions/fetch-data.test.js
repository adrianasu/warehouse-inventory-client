import {
    API_BASE_URL
} from '../../config';
import { 
    fetchDataSuccess, 
    FETCH_DATA_SUCCESS, 
    fetchDataError,
    FETCH_DATA_ERROR, 
    fetchBegin,
    FETCH_BEGIN, 
    fetchData
} from '../../actions/fetch-data';

const data = [{item: 'item1'}];
const error = { message: 'Error'};

describe('fetchBegin', () => {
    it('Should return the action', () => {
        const action = fetchBegin();
        expect(action.type).toEqual(FETCH_BEGIN);
    });
});

describe('fetchDataSuccess', () => {
    it('Should return the action', () => {
        const action = fetchDataSuccess(data);
        expect(action.type).toEqual(FETCH_DATA_SUCCESS);
        expect(action.data).toEqual(data);
    });
});

describe('fetchDataError', () => {
    it('Should return the action', () => {
        const action = fetchDataError(error);
        expect(action.type).toEqual(FETCH_DATA_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe('fetchData', () => {
    const values = { 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer null`
        },    
        method: 'GET',
        searchType: 'searchAll', 
        searchTerm: 'item'
    }
    it('Should dispatch fetchDataSuccess', () => {
        const dispatch = jest.fn();

        global.fetch = jest.fn().mockImplementation(() => 
            Promise.resolve({
                ok: true,
                json(){
                    return data;
                }
            })
        );
        return fetchData(values)(dispatch).then(() => {
            const route = `${API_BASE_URL}/item`;
            const method = values.method;
            const headers = values.headers;
            expect(dispatch).toHaveBeenCalledWith(fetchBegin());            
            expect(fetch).toHaveBeenCalledWith(route, {method, headers});
            expect(dispatch).toHaveBeenCalledWith(fetchDataSuccess(data));
        })
        
    });
})