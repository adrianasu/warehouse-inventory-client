const selectComponent = ['product', 'warehouse', 'condition', 'units', 'manufacturer', 'category', 'accessLevel', 'department'];
const inputComponent = ['barcode', 'serialNumber', 'aisle', 'shelf', 'bin', 'name', 'model', 'quantity', 'email', 'employeeId', 'password', 'firstName', 'lastName'];
const checkComponent = ['consummable'];

const isNumber = ['barcode', 'serialNumber', 'shelf', 'bin', 'quantity'];
const isEmail = ['email'];

const collections = {
    item: {
        edit: {
            primType: null,
            objType: {
                location: ['warehouse', 'aisle', 'shelf', 'bin']
            }
        },
        create: {
            primType: ['product', 'barcode', 'serialNumber'],
            objType: {
                location: ['warehouse', 'aisle', 'shelf', 'bin'],
                registered: ['condition']
            }
        },
    },
    product: {
        edit: {
            primType: ['name', 'model', 'consummable'],
            objType: {
                minimumRequired: ['quantity', 'units']
            }
        }, 
        create: {
            primType: ['name', 'model', 'manufacturer', 'category', 'consummable'],
            objType: {
                minimumRequired: ['quantity', 'units']
            }
        }, 
    },
    category: {
        edit: {
            primType: ['name'],
            objType: null
        },
        create: {
            primType: ['name'],
            objType: null
        },
    },
    manufacturer: {
         edit: {
            primType: ['name'],
            objType: null
        },
        create: {
            primType: ['name'],
            objType: null
        },
    },
    department: {
         edit: {
            primType: ['name'],
            objType: null
        },
        create: {
            primType: ['name'],
            objType: null
        },
    },
    user: {
        edit: {
            primType: ['email', 'accessLevel'],
            objType: null
        },
        create: {
            primType: ['employeeId', 'email', 'password'],
            objType: null
        }
    },
    employee: {
         edit: {
            primType: ['firstName', 'lastName', 'department'],
            objType: null
        },
        create: {
            primType: ['firstName', 'lastName', 'employeeId', 'department'],
            objType: null
        }
    }
};

export const getEditFields = dataCollection => collections[dataCollection].edit;
export const getCreateFields = dataCollection => collections[dataCollection].create;

export const isInput = field => inputComponent.includes(field); 
export const isSelect = field => selectComponent.includes(field);
export const isCheck = field => checkComponent.includes(field);

export const whatType = field => isEmail.includes(field) ? 'email' : 
                                    isNumber.includes(field) ? 'number' : 'text';
