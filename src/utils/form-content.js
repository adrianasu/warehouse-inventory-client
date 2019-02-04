import { email, isText, isNumber, isPositive, noSpecialChars, required } from './validators';

const selectComponent = ['product', 'warehouse', 'condition', 'minimumRequiredUnits', 'manufacturer', 'category', 'accessLevel', 'department'];
const inputComponent = ['barcode', 'serialNumber', 'aisle', 'shelf', 'bin', 'name', 'model', 'minimumRequiredQuantity', 'email', 'employeeId', 'password', 'firstName', 'lastName'];
const checkComponent = ['consummable'];

const itIsNumber = ['barcode', 'serialNumber', 'shelf', 'bin', 'minimumRequiredQuantity', 'employeeId'];
const itIsEmail = ['email'];

const collections = {
    item: {
        edit: ['warehouse', 'aisle', 'shelf', 'bin'],
        create: ['product', 'barcode', 'serialNumber', 'warehouse', 'aisle', 'shelf', 'bin', 'condition'],
    },
    product: {
        edit: ['name', 'model', 'minimumRequiredQuantity', 'minimumRequiredUnits', 'consummable'],
        create: ['name', 'model', 'manufacturer', 'category', 'minimumRequiredQuantity', 'minimumRequiredUnits', 'consummable'],
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

export const whatType = field => itIsEmail.includes(field) ? 'email' : 
                                    itIsNumber.includes(field) ? 'number' : 'text';

export const validateThis = field =>  itIsEmail.includes(field) ? [email, required] :
                                        itIsNumber.includes(field) ? [isNumber, isPositive, noSpecialChars, required] :
                                            [isText, noSpecialChars, required];