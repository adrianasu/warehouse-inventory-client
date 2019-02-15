export const BASIC_ACCESS_LEVEL = 0;
export const OVERVIEW_ACCESS_LEVEL = 10;
export const PUBLIC_ACCESS_LEVEL = 20;
export const ADMIN_ACCESS_LEVEL = 30;


const list ={
    'on-shelf': {
        keys: ['item', 'location'],
        details: ['item', 'location', 'barcode', 'model','manufacturer', 'category', 'serialNumber', 'checkedIn'], 
    },
    'checked-out': {
        keys: ['item', 'checked-out by'],
        details: ['item', 'checked-out by', 'barcode', 'model', 'manufacturer', 'category', 'serialNumber', 'checkedOut'], 
    },
    'low-stock': {
        keys: ['product', 'shortfall'],
        details: ['product', 'inStock', 'minimumRequired', 'shortfall'], // what item is instock
    },
    'useful-life': {
        keys: ['item', 'usefulLife'],
        details: ['item', 'usefulLife', 'barcode', 'model', 'manufacturer', 'category', 'serialNumber', 'location'],
    },
    item: {
        keys: ['item'],
        details: ['product', 'barcode', 'model', 'manufacturer', 'category', 'serialNumber', 'location', 'warehouse', 'aisle', 'shelf', 'bin', 'isCheckedOut'],
    },
    product: {
        keys: ['product', 'quantity'],
        details: ['name', 'model', 'manufacturer', 'category', 'consummable', 'quantity', 'minimumRequiredQuantity', 'minimumRequiredUnits'],
    },
    category: {
        keys: ['name'],
        details: ['name'],
    },
    manufacturer: {
        keys: ['name'],
        details: ['name'],
    },
    department: {
        keys: ['name'],
        details: ['name'],
    },
    user: {
        keys: ['employeeId', 'accessLevel'],
        details: ['email', 'employeeId', 'accessLevel'],
    },
    employee: {
        keys: ['firstName', 'lastName', 'employeeId'],
        details: ['firstName', 'lastName', 'employeeId', 'department'],
    }
}


export const getKeys = listType => list[listType].keys;

export const getDetailKeys = listType => list[listType].details;