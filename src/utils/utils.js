// Return an array that contains the indexes of
// all uppercase letters found in a string.
export const findUpperCase = aString => {
    let index = [];
    for (let x = 0; x < aString.length; x += 1) {
        if (aString.charAt(x) >= 'A' && aString.charAt(x) <= 'Z') {
            index.push(x);
        }
    }
    return index;
}

// Transform camel case strings into
// readable strings, by adding spaces.
export const addSpace = aString => {
    let idxArray = findUpperCase(aString);
    if (idxArray.length > 0) {
        let startIdx = 0;
        let spacedString = [];
        for (let x = 0; x <= idxArray.length; x += 1) {
            if (x === idxArray.length) {
                spacedString.push(aString.substring(startIdx))
            } else {
                spacedString.push(aString.substring(startIdx, idxArray[x]));
                startIdx = idxArray[x];
            }
        }
        return spacedString.join(" ");
    }
    return aString;
}

// Return date in the sent template or 'MM/DD/YYYY HH:mm:ss' template
export const formatDate = (date = Date.now(), template = 'MM/DD/YYYY HH:mm:ss') => {
    let specs = 'YYYY:MM:DD:HH:mm:ss'.split(':');
    return new Date(date).toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
        return template.split(specs[i]).join(item);
    }, template);
}

export const getItem = ({ data, id }) => {
    let myItem = {};
    data.forEach(item => {
        if (item.id === id) {
            myItem = item;
        }
    });
    return myItem;
}

export const getId = ({ data, value, key }) => {
    console.log(data, value, key)
    let myId;
    data.forEach(item => {
        if (item[key] === value) {
            myId = item.id;
        }
    });
    return myId;
}

export const getRelatedData = dataType => {
    return dataType === 'item' ?
        ['products'] : dataType === 'product' ?
            ['manufacturers', 'categories'] : dataType === 'employee' ?
                ['departments'] : null;
}