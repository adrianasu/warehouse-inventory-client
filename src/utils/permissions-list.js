const list = [
    {
        authorized: ['basic', 'overview', 'public', 'admin'],   
        action: [
            'Get list of all items.', 
            'Get list of available items.',
            'Search items.',
            'Do advanced search.'
        ]
    },
    {
        authorized: ['overview', 'public', 'admin'],
        action: ['View your account (checked-out items)']
    },
    {
        authorized: ['public', 'admin'],
        action: [
            'View other people\'s accounts.',
            'Execute items\' check-in and check-out.',
            'View On Shelf, Checked-Out, Low Stock and Useful Life reports.',
            'Get lists of products, categories, manufacturers, departments, employees and users.',
            'Increment other user\'s access level.',
            'Edit or update all the information available.'
        ]
    },
    {
        authorized: ['admin'],
        action: [
            'Delete all information available.'
        ]
    },
    {
        authorized: ['basic'],
        action: [
            'Create an account.'
        ]
    },
    
]


export const getUserPermissions = userLevel => {
    let permissions = [];
    list.forEach(item => {
        if( item.authorized.includes(userLevel.toLowerCase()) ){
            // concat merge two or more arrays
            permissions = permissions.concat(item.action)
        }
    } )
    return permissions;
}