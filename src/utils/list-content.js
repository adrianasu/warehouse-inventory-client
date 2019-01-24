export const BASIC_ACCESS_LEVEL = 0;
export const OVERVIEW_ACCESS_LEVEL = 10;
export const PUBLIC_ACCESS_LEVEL = 20;
export const ADMIN_ACCESS_LEVEL = 30;


const list ={
    'on-shelf': {
        keys: ['product', 'location'],
        details: ['product', 'location', 'barcode', 'model','manufacturer', 'category', 'serialNumber', 'checkedIn'], 
    },
    'checked-out': {
        keys: ['product', 'location'],
        details: ['product', 'location', 'barcode', 'model', 'manufacturer', 'category', 'serialNumber', 'checkedOut'], 
    },
    'low-stock': {
        keys: ['product', 'inStock', 'minimumRequired', 'difference'],
        details: ['product', 'inStock', 'minimumRequired', 'difference'], // what item is instock
    },
    'useful-life': {
        keys: ['product', 'usefulLife', 'location'],
        details: ['product', 'usefulLife', 'barcode', 'model', 'manufacturer', 'category', 'serialNumber', 'location'],
    },
    item: {
        keys: ['product', 'serialNumber', 'isCheckedOut'],
        details: ['product', 'barcode', 'model', 'manufacturer', 'category', 'serialNumber', 'warehouse', 'ailse', 'shelf', 'bin', 'isCheckedOut'],
    },
    product: {
        keys: ['name', 'category', 'consummable'],
        details: ['name', 'model', 'manufacturer', 'category', 'consummable', 'minimumRequiredQuantity', 'minimumRequiredUnits'],
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
        keys: ['email', 'employeeId', 'accessLevel'],
        details: ['email', 'employeeId', 'accessLevel'],
    },
    employee: {
        keys: ['firstName', 'lastName', 'employeeId', 'department' ],
        details: ['firstName', 'lastName', 'employeeId', 'department'],
    }
}


export const getKeys = listType => list[listType].keys;

export const getDetailKeys = listType => list[listType].details;