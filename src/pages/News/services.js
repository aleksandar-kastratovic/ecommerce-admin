import axios from "axios";

const api = () => {
    return localStorage.getItem("api");
    // return apiLocal;
};

export const getListNews = async (token, search) => {
    return await axios({
        method: "LIST",
        url: `${api()}admin/news-b2c/news/`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { search: search },
    });
};

export const getNews = async (token, id) => {
    return await axios({
        method: "GET",
        url: `${api()}admin/news-b2c/news/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const saveNews = async (token, data = {}) => {
    const req = JSON.stringify(data);
    return await axios({
        method: "POST",
        url: `${api()}admin/news-b2c/news/basic-data`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: req,
    });
};

export const deleteNews = async (token, id) => {
    return await axios({
        method: "DELETE",
        url: `${api()}admin/news-b2c/news/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
