import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListNewsCategoryList = async (token, search) => {
    return await axios({
      method: "LIST",
      url: `${api()}admin/news_b2c/b2c_category_news/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { search: search },
    });
  };

  export const getNewsCategoryList = async (token, id) => {
    return await axios({
      method: "GET",
      url: `${api()}admin/news_b2c/b2c_category_news/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const saveNewsCategoryList= async (token, data = {}) => {
    const req = JSON.stringify(data);
    return await axios({
      method: "POST",
      url: `${api()}admin/news_b2c/b2c_category_news/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: req,
    });
  };

export const deleteNewsCategoryList = async (token, id) => {
    return await axios({
      method: "DELETE",
      url: `${api()}admin/news_b2c/b2c_category_news/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  export const saveForm = async (token, data = {}) => {
    const req = JSON.stringify(data);
    return await axios({
      method: "POST",
      url: `${api()}admin/news_b2c/b2c_category_news/`,
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
      url: `${api()}admin/news_b2c/b2c_category_news/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: req,
    });
  };
  
  export const deleteFormField = async (token, id) => {
    return await axios({
      method: "DELETE",
      url: `${api()}admin/news_b2c/b2c_category_news/values/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  export const getFormData = async (token, id) => {
    return await axios({
      method: "GET",
      url: `${api()}admin/news_b2c/b2c_category_news/main/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const getListFormFields = async (token, id) => {
    return await axios({
      method: "LIST",
      url: `${api()}admin/news_b2c/b2c_category_news/values/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };