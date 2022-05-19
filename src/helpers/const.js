export const screensData = {
    PRODU: {id: 1, screen_code: 'PRODU', screen: 'Product'},
    ORDER: {id: 2, screen_code: 'ORDER', screen: 'Orders'},
    BANNR: {id: 3, screen_code: 'BANNR', screen: 'Banners'},
    NEEWS: {id: 4, screen_code: 'NEEWS', screen: 'News'},
    CATEG: {id: 5, screen_code: 'CATEG', screen: 'Categories'},
    ROLES: {id: 6, screen_code: 'ROLES', screen: 'Roles'},
    USERS: {id: 7, screen_code: 'USERS', screen: 'Users'},
    ACTON: {id: 8, screen_code: 'ACTON', screen: 'Actions'},
    CUSTM: {id: 9, screen_code: 'CUSTM', screen: 'Customers'},
    LOCAT: {id: 10, screen_code: 'LOCAT', screen: 'Locations'},
    SETNG: {id: 11, screen_code: "SETNG", screen: "Settings"}
};

export const inventoryOptions = [{ id: 1, name: 'Više lokacija'}, { id: null, name: 'Jedna lokacija'}];

export const regax = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

export const apiLocal = 'http://127.0.0.1:8000/api/v1/';
