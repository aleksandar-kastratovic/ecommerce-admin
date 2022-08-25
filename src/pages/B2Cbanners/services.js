import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListB2Cbanners = async (token, search) => {
  return await axios({
    method: "LIST",
    url: `${api()}admin/banners-b2c`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      search: search,
    },
  });
};

export const getDetailsB2Cbanners = async (token, id) => {
  return await axios({
    method: "get",
    url: `${api()}admin/banners-b2c/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createBanner = async (token, data) => {
  return await axios({
    method: "post",
    url: `${api()}admin/banners-b2c`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteB2Cbanners = async (token, id) => {
  return await axios({
    method: "delete",
    url: `${api()}admin/banners-b2c/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
