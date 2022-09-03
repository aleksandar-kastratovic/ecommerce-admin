import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListStaticPages = async (token, search) => {
    return await axios({
      method: "LIST",
      url: `${api()}admin/static-pages-b2c/page/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { search: search },
    });
  };

  export const getStaticPages = async (token, id) => {
    return await axios({
      method: "GET",
      url: `${api()}admin/static-pages-b2c/page/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const saveStaticPages = async (token, data = {}) => {
    const req = JSON.stringify(data);
    return await axios({
      method: "POST",
      url: `${api()}admin/static-pages-b2c/page/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: req,
    });
  };

export const deleteStaticPages = async (token, id) => {
    return await axios({
      method: "DELETE",
      url: `${api()}admin/static-pages-b2c/page/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  export const saveForm = async (token, data = {}) => {
    const req = JSON.stringify(data);
    return await axios({
      method: "POST",
      url: `${api()}admin/static-pages-b2c/page/`,
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
      url: `${api()}admin/static-pages-b2c/page/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: req,
    });
  };
  
  export const deleteFormField = async (token, id) => {
    return await axios({
      method: "DELETE",
      url: `${api()}admin/static-pages-b2c/page/values/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  export const getFormData = async (token, id) => {
    return await axios({
      method: "GET",
      url: `${api()}admin/static-pages-b2c/page/main/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const getListFormFields = async (token, id) => {
    return await axios({
      method: "LIST",
      url: `${api()}admin/static-pages-b2c/page/values/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };