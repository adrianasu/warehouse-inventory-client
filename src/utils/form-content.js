const selectComponent = ['product', 'warehouse', 'condition', 'minimumRequiredUnits', 'manufacturer', 'category', 'accessLevel', 'department'];
const inputComponent = ['barcode', 'serialNumber', 'aisle', 'shelf', 'bin', 'name', 'model', 'minimumRequiredQuantity', 'email', 'employeeId', 'password', 'firstName', 'lastName'];
const checkComponent = ['consummable'];

const isNumber = ['barcode', 'serialNumber', 'shelf', 'bin', 'quantity'];
const isEmail = ['email'];

const collections = {
    item: {
        edit: ['warehouse', 'aisle', 'shelf', 'bin'],
        create: ['product', 'barcode', 'serialNumber', 'warehouse', 'aisle', 'shelf', 'bin', 'condition'],
    },
    product: {
        edit: ['name', 'model', 'minimumRequiredQuantity', 'minimumRequiredUnits', 'consummable'],
        create: ['name', 'model', 'manufacturer', 'category', 'consummable', 'minimumRequiredQuantity', 'minimumRequiredUnits'],
    },
    category: {
        edit: ['name'],
        create: ['name']
    },
    manufacturer: {
         edit: ['name'],
        create: ['name']
    },
    department: {
         edit: ['name'],
        create: ['name'],
    },
    user: {
        edit: ['email', 'accessLevel'],
        create: ['employeeId', 'email', 'password']
    },
    employee: {
         edit: ['firstName', 'lastName', 'department'],
        create: ['firstName', 'lastName', 'employeeId', 'department'],
    }
};

export const getEditFields = dataCollection => collections[dataCollection].edit;
export const getCreateFields = dataCollection => collections[dataCollection].create;

export const isInput = field => inputComponent.includes(field); 
export const isSelect = field => selectComponent.includes(field);
export const isCheck = field => checkComponent.includes(field);

export const whatType = field => isEmail.includes(field) ? 'email' : 
                                    isNumber.includes(field) ? 'number' : 'text';
