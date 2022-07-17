import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListB2Bbanners = async (token, module) => {
  return await axios({
    method: "LIST",
    url: `${api()}admin/banners-b2b`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDetailsB2Bbanners = async (token, id) => {
  return await axios({
    method: "get",
    url: `${api()}admin/banners-b2b/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
