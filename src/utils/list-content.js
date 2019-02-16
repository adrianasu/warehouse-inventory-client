export const BASIC_ACCESS_LEVEL = 0;
export const OVERVIEW_ACCESS_LEVEL = 10;
export const PUBLIC_ACCESS_LEVEL = 20;
export const ADMIN_ACCESS_LEVEL = 30;

//
const list ={
    'on-shelf': {
        keys: ['item', 'location'],
    },
    'checked-out': {
        keys: ['item', 'checked-out by'],
    },
    'low-stock': {
        keys: ['product', 'shortfall'],
    },
    'useful-life': {
        keys: ['item', 'usefulLife'],
    },
    item: {
        keys: ['item'],
    },
    product: {
        keys: ['product', 'quantity'],
    },
    category: {
        keys: ['name'],
    },
    manufacturer: {
        keys: ['name'],
    },
    department: {
        keys: ['name'],
    },
    user: {
        keys: ['employeeId', 'accessLevel'],
    },
    employee: {
        keys: ['firstName', 'lastName', 'employeeId'],
    }
}


export const getKeys = listType => list[listType].keys;

export const getDetailKeys = listType => list[listType].details;