import { apiLocal } from "./const";

const api = () => {
    return localStorage.getItem("api");
    // return apiLocal;
};

export const saveUserService = async (saveData, saveUserRequest) => {
    let data;

    const saveUserResponse = (userData) => {
        data = userData;
    };

    await saveUserRequest(
        {
            url: api() + "user/register",
            method: "PUT",
            body: saveData,
        },
        saveUserResponse
    );
    return data;
};

export const userListService = async (userListRequest) => {
    let data;

    const userListResponse = (userData) => {
        data = userData;
    };

    await userListRequest(
        {
            url: api() + "user/list",
            method: "PUT",
        },
        userListResponse
    );
    return data;
};

export const categoryListService = async (categoryListRequest) => {
    let data;

    const categoryListResponse = (userData) => {
        data = userData;
    };

    await categoryListRequest(
        {
            url: api() + "category/list",
            method: "PUT",
        },
        categoryListResponse
    );
    return data;
};

export const saveCategoryService = async (saveData, saveCategoryRequest) => {
    let data;

    const saveCategoryResponse = (categoryData) => {
        data = categoryData;
    };

    await saveCategoryRequest(
        {
            url: api() + "category/save",
            method: "PUT",
            body: saveData,
        },
        saveCategoryResponse
    );
    return data;
};

export const saveCategoryImageService = async (saveData, saveCategoryImageRequest) => {
    let data;

    const saveCategoryImageResponse = (categoryData) => {
        data = categoryData;
    };

    await saveCategoryImageRequest(
        {
            url: api() + "category/image/upload",
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: saveData,
        },
        saveCategoryImageResponse
    );
    return data;
};

export const removeCategoryService = async (requestData, removeCategoryRequest) => {
    let data;

    const removeCategoryResponse = (removeCategoryData) => {
        data = removeCategoryData;
    };

    await removeCategoryRequest(
        {
            url: api() + "category/delete",
            method: "PUT",
            body: requestData,
        },
        removeCategoryResponse
    );
    return data;
};

export const rolesListService = async (rolesListRequest) => {
    let data;

    const rolesListResponse = (rolesData) => {
        data = rolesData;
    };

    await rolesListRequest(
        {
            url: api() + "role/list",
            method: "PUT",
        },
        rolesListResponse
    );
    return data;
};

export const loginService = async (loginData, loginRequest) => {
    let data;

    const loginResponse = (userData) => {
        data = userData;
    };

    await loginRequest(
        {
            url: api() + "user/login",
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: loginData,
        },
        loginResponse
    );
    return data;
};

export const forgotPasswordService = async (forgotData, forgotRequest) => {
    let data;

    const forgotResponse = (responseData) => {
        data = responseData;
    };

    await forgotRequest(
        {
            url: api() + "password/forgot",
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: forgotData,
        },
        forgotResponse
    );
    return data;
};

export const resetPasswordService = async (resetData, resetRequest) => {
    let data;

    const resetResponse = (responseData) => {
        data = responseData;
    };

    await resetRequest(
        {
            url: api() + "password/reset",
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: resetData,
        },
        resetResponse
    );
    return data;
};

export const logoutService = async (logoutRequest) => {
    let data;

    const logoutResponse = (logoutData) => {
        data = logoutData;
    };

    await logoutRequest(
        {
            url: api() + "user/logout",
            method: "PUT",
        },
        logoutResponse
    );
    return data;
};

export const removeRoleService = async (requestData, removeRoleRequest) => {
    let data;

    const removeRoleResponse = (removeRoleData) => {
        data = removeRoleData;
    };

    await removeRoleRequest(
        {
            url: api() + "role/delete",
            method: "PUT",
            body: requestData,
        },
        removeRoleResponse
    );
    return data;
};

export const saveRoleService = async (saveData, saveRoleRequest) => {
    let data;

    const saveRoleResponse = (roleData) => {
        data = roleData;
    };

    await saveRoleRequest(
        {
            url: api() + "role/save",
            method: "PUT",
            body: saveData,
        },
        saveRoleResponse
    );
    return data;
};

export const getRoleService = async (getData, getRoleRequest) => {
    let data;

    const getRoleResponse = (roleData) => {
        data = roleData;
    };

    await getRoleRequest(
        {
            url: api() + "role/get",
            method: "PUT",
            body: getData,
        },
        getRoleResponse
    );
    return data;
};

export const getUserService = async (getData, getUserRequest) => {
    let data;

    const getUserResponse = (userData) => {
        data = userData;
    };

    await getUserRequest(
        {
            url: api() + "user/get",
            method: "PUT",
            body: getData,
        },
        getUserResponse
    );
    return data;
};

export const removeUserService = async (requestData, removeUserRequest) => {
    let data;

    const removeUserResponse = (removeUserData) => {
        data = removeUserData;
    };

    await removeUserRequest(
        {
            url: api() + "user/delete",
            method: "PUT",
            body: requestData,
        },
        removeUserResponse
    );
    return data;
};

export const refreshTokenService = async (refreshRequest) => {
    let data;

    const refreshResponse = (userData) => {
        data = userData;
    };

    await refreshRequest(
        {
            url: api() + "user/refresh",
            method: "PUT",
        },
        refreshResponse
    );
    return data;
};

export const userScreensService = async (screensRequest) => {
    let data;

    const screensResponse = (screensData) => {
        data = screensData;
    };

    await screensRequest(
        {
            url: api() + "user/screens",
            method: "PUT",
        },
        screensResponse
    );
    return data;
};

export const referenceDataService = async (referenceRequest) => {
    let data;

    const referenceResponse = (referenceData) => {
        data = referenceData;
    };

    await referenceRequest(
        {
            url: api() + "reference-data",
        },
        referenceResponse
    );
    return data;
};

export const getCategoryService = async (getData, getCategoryRequest) => {
    let data;

    const getCategoryResponse = (categoryData) => {
        data = categoryData;
    };

    await getCategoryRequest(
        {
            url: api() + "category/get",
            method: "PUT",
            body: getData,
        },
        getCategoryResponse
    );
    return data;
};

export const saveProductAttributeService = async (saveData, saveProductAttributeRequest) => {
    let data;

    const saveProductAttributeResponse = (productAttributeData) => {
        data = productAttributeData;
    };

    await saveProductAttributeRequest(
        {
            url: api() + "products/attribute-values/save",
            method: "PUT",
            body: saveData,
        },
        saveProductAttributeResponse
    );
    return data;
};

export const getProductAttributeService = async (getData, getProductAttributeRequest) => {
    let data;

    const getProductAttributeResponse = (productAttributeData) => {
        data = productAttributeData;
    };

    await getProductAttributeRequest(
        {
            url: api() + "products/attribute-values/get",
            method: "PUT",
            body: getData,
        },
        getProductAttributeResponse
    );
    return data;
};

export const removeProductAttributeService = async (requestData, removeProductAttributeRequest) => {
    let data;

    const removeProductAttributeResponse = (removeProductAttributeData) => {
        data = removeProductAttributeData;
    };

    await removeProductAttributeRequest(
        {
            url: api() + "products/attribute-values/delete",
            method: "PUT",
            body: requestData,
        },
        removeProductAttributeResponse
    );
    return data;
};

export const productAttributesListService = async (productAttributesListRequest) => {
    let data;

    const productAttributesListResponse = (productAttributesData) => {
        data = productAttributesData;
    };

    await productAttributesListRequest(
        {
            url: api() + "products/attribute-values/list",
            method: "PUT",
        },
        productAttributesListResponse
    );
    return data;
};

export const attributesListService = async (attributesListRequest) => {
    let data;

    const attributesListResponse = (attributesData) => {
        data = attributesData;
    };

    await attributesListRequest(
        {
            url: api() + "products/attributes/list",
            method: "PUT",
        },
        attributesListResponse
    );
    return data;
};

export const attributeValuesListService = async (requestData, attributeValuesListRequest) => {
    let data;

    const attributeValuesListResponse = (attributesValuesData) => {
        data = attributesValuesData;
    };

    await attributeValuesListRequest(
        {
            url: api() + "products/variants/list",
            method: "PUT",
            body: requestData,
        },
        attributeValuesListResponse
    );
    return data;
};

export const locationsListService = async (locationsListRequest) => {
    let data;

    const locationsListResponse = (locationsData) => {
        data = locationsData;
    };

    await locationsListRequest(
        {
            url: api() + "location/list",
            method: "PUT",
        },
        locationsListResponse
    );
    return data;
};

export const saveProductService = async (saveData, saveProductRequest) => {
    let data;

    const saveProductResponse = (productData) => {
        data = productData;
    };

    await saveProductRequest(
        {
            url: api() + "products/save",
            method: "PUT",
            body: saveData,
        },
        saveProductResponse
    );
    return data;
};

export const removeProductService = async (requestData, removeProductRequest) => {
    let data;

    const removeProductResponse = (removeProductData) => {
        data = removeProductData;
    };

    await removeProductRequest(
        {
            url: api() + "products/delete",
            method: "PUT",
            body: requestData,
        },
        removeProductResponse
    );
    return data;
};

export const saveProductImagesService = async (saveData, saveProductImagesRequest) => {
    let data;

    const saveProductImagesResponse = (productData) => {
        data = productData;
    };

    await saveProductImagesRequest(
        {
            url: api() + "products/images/upload",
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: saveData,
        },
        saveProductImagesResponse
    );
    return data;
};

export const getProductService = async (getData, getProductRequest) => {
    let data;

    const getProductResponse = (productData) => {
        data = productData;
    };

    await getProductRequest(
        {
            url: api() + "products/get",
            method: "PUT",
            body: getData,
        },
        getProductResponse
    );
    return data;
};

export const productsListService = async (getData, productsListRequest) => {
    let data;

    const productsListResponse = (productsData) => {
        data = productsData;
    };

    await productsListRequest(
        {
            url: api() + "products/list",
            method: "PUT",
            body: getData,
        },
        productsListResponse
    );
    return data;
};

export const saveLocationService = async (saveData, saveLocationRequest) => {
    let data;

    const saveLocationResponse = (productAttributeData) => {
        data = productAttributeData;
    };

    await saveLocationRequest(
        {
            url: api() + "location/save",
            method: "PUT",
            body: saveData,
        },
        saveLocationResponse
    );
    return data;
};

export const getLocationService = async (getData, getLocationRequest) => {
    let data;

    const getLocationResponse = (locationData) => {
        data = locationData;
    };

    await getLocationRequest(
        {
            url: api() + "location/get",
            method: "PUT",
            body: getData,
        },
        getLocationResponse
    );
    return data;
};

export const removeLocationsService = async (requestData, removeLocationsRequest) => {
    let data;

    const removeLocationsResponse = (removeLocationsData) => {
        data = removeLocationsData;
    };

    await removeLocationsRequest(
        {
            url: api() + "location/delete",
            method: "PUT",
            body: requestData,
        },
        removeLocationsResponse
    );
    return data;
};

export const customersListService = async (getData, customersListRequest) => {
    let data;

    const customersListResponse = (customersData) => {
        data = customersData;
    };

    await customersListRequest(
        {
            url: api() + "customer/b2b/list",
            method: "PUT",
            body: getData,
        },
        customersListResponse
    );
    return data;
};

export const saveCustomerService = async (saveData, saveCustomerRequest) => {
    let data;

    const saveCustomerResponse = (customerData) => {
        data = customerData;
    };

    await saveCustomerRequest(
        {
            url: api() + "customer/b2b/save",
            method: "PUT",
            body: saveData,
        },
        saveCustomerResponse
    );
    return data;
};

export const getCustomerService = async (getData, getCustomerRequest) => {
    let data;

    const getCustomerResponse = (customerData) => {
        data = customerData;
    };

    await getCustomerRequest(
        {
            url: api() + "customer/b2b/get",
            method: "PUT",
            body: getData,
        },
        getCustomerResponse
    );
    return data;
};

export const removeCustomerService = async (requestData, removeCustomerRequest) => {
    let data;

    const removeCustomerResponse = (removeCustomerData) => {
        data = removeCustomerData;
    };

    await removeCustomerRequest(
        {
            url: api() + "customer/b2b/delete",
            method: "PUT",
            body: requestData,
        },
        removeCustomerResponse
    );
    return data;
};

export const companyListService = async (getData, companyListRequest) => {
    let data;

    const companyListResponse = (companiesData) => {
        data = companiesData;
    };

    await companyListRequest(
        {
            url: api() + "customer/companies/list",
            method: "PUT",
            body: getData,
        },
        companyListResponse
    );
    return data;
};

export const saveCompanyService = async (saveData, saveCompanyRequest) => {
    let data;

    const saveCompanyResponse = (companyData) => {
        data = companyData;
    };

    await saveCompanyRequest(
        {
            url: api() + "customer/companies/save",
            method: "PUT",
            body: saveData,
        },
        saveCompanyResponse
    );
    return data;
};

export const getCompanyService = async (getData, getCompanyRequest) => {
    let data;

    const getCompanyResponse = (companyData) => {
        data = companyData;
    };

    await getCompanyRequest(
        {
            url: api() + "customer/companies/get",
            method: "PUT",
            body: getData,
        },
        getCompanyResponse
    );
    return data;
};

export const removeCompanyService = async (requestData, removeCompanyRequest) => {
    let data;

    const removeCompanyResponse = (removeCompanyData) => {
        data = removeCompanyData;
    };

    await removeCompanyRequest(
        {
            url: api() + "customer/companies/delete",
            method: "PUT",
            body: requestData,
        },
        removeCompanyResponse
    );
    return data;
};

export const ordersListService = async (getData, ordersListRequest) => {
    let data;

    const ordersListResponse = (ordersData) => {
        data = ordersData;
    };

    await ordersListRequest(
        {
            url: api() + "order/list",
            method: "PUT",
            body: getData,
        },
        ordersListResponse
    );
    return data;
};

export const getOrderService = async (getData, getOrderRequest) => {
    let data;

    const getOrderResponse = (orderData) => {
        data = orderData;
    };

    await getOrderRequest(
        {
            url: api() + "order/get",
            method: "PUT",
            body: getData,
        },
        getOrderResponse
    );
    return data;
};

export const saveOrderStatusService = async (getData, saveOrderRequest) => {
    let data;

    const saveOrderResponse = (orderData) => {
        data = orderData;
    };

    await saveOrderRequest(
        {
            url: api() + "order/status/update",
            method: "PUT",
            body: getData,
        },
        saveOrderResponse
    );
    return data;
};

export const categoriesSynchroListService = async (categoriesSynchroRequest) => {
    let data;

    const categoriesSynchroResponse = (categoriesSynchroData) => {
        data = categoriesSynchroData;
    };

    await categoriesSynchroRequest(
        {
            url: api() + "category/import/list",
            method: "PUT",
        },
        categoriesSynchroResponse
    );
    return data;
};

export const companiesIdName = async (getData, comapniesRequest) => {
    let data;

    const comapniesResponse = (comapniesData) => {
        data = comapniesData;
    };

    await comapniesRequest(
        {
            url: api() + "customer/companies/all",
            method: "PUT",
            body: getData,
        },
        comapniesResponse
    );
    return data;
};
