import axios from "axios";

const api = () => {
    return localStorage.getItem("api");
    // return apiLocal;
};

export const getListNewsCategoryList = async (token, search) => {
    return await axios({
        method: "LIST",
        url: `${api()}admin/news-b2c/category/basic-data/`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { search: search },
    });
};

export const getNewsCategoryList = async (token, id) => {
    return await axios({
        method: "GET",
        url: `${api()}admin/news-b2c/category/basic-data/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const saveNewsCategoryList = async (token, data = {}) => {
    const req = JSON.stringify(data);
    return await axios({
        method: "POST",
        url: `${api()}admin/news-b2c/category/basic-data/`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: req,
    });
};

export const deleteNewsCategoryList = async (token, id) => {
    return await axios({
        method: "DELETE",
        url: `${api()}admin/news-b2c/category/basic-data/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const saveForm = async (token, data = {}) => {
    const req = JSON.stringify(data);
    return await axios({
        method: "POST",
        url: `${api()}admin/news-b2c/category/basic-data/`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: req,
    });
};

export const saveFormField = async (token, data = {}) => {
    const req = JSON.stringify(data);
    return await axios({
        method: "POST",
        url: `${api()}admin/news-b2c/category/basic-data/`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: req,
    });
};

export const deleteFormField = async (token, id) => {
    return await axios({
        method: "DELETE",
        url: `${api()}admin/news-b2c/category/basic-data/values/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getFormData = async (token, id) => {
    return await axios({
        method: "GET",
        url: `${api()}admin/news-b2c/category/basic-data/main/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getListFormFields = async (token, id) => {
    return await axios({
        method: "LIST",
        url: `${api()}admin/nnews-b2c/category/basic-data/values/`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
