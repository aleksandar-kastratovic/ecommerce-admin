import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListParams = async (token, search) => {
  return await axios({
    method: "LIST",
    url: `${api()}admin/params/main/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { search: search },
  });
};

export const getParamData = async (token, id) => {
  return await axios({
    method: "GET",
    url: `${api()}admin/params/main/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const setParamData = async (token, data) => {
  return await axios({
    method: "POST",
    url: `${api()}admin/params/main/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
};

export const deleteParam = async (token, id) => {
  
  return await axios({
    method: "DELETE",
    url: `${api()}admin/params/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const saveForm = async (token, data = {}) => {
  const req = JSON.stringify(data);
  return await axios({
    method: "POST",
    url: `${api()}admin/params/main/`,
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
    url: `${api()}admin/params/main/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: req,
  });
};

export const deleteFormField = async (token, id) => {
  return await axios({
    method: "DELETE",
    url: `${api()}admin/params/values/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getFormData = async (token, id) => {
  return await axios({
    method: "GET",
    url: `${api()}admin/params/main/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getListFormFields = async (token, id) => {
  return await axios({
    method: "LIST",
    url: `${api()}admin/params/values/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};