import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListB2Bconfig = async (token) => {
  return await axios.get(`${api()}configuration/b2b`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSubmodulesList = async (token, module) => {
  return await axios.get(`${api()}configuration/b2b/${module}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSlug = async (token, module, slug) => {
  return await axios.get(`${api()}configuration/b2b/${module}/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
