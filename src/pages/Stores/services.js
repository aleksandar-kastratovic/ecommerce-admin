import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListStores = async (token, search) => {
    return await axios({
      method: "LIST",
      url: `${api()}admin/stores`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { search: search },
    });
  };
  export const getStore = async (token, id) => {
    return await axios({
      method: "GET",
      url: `${api()}admin/stores/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const saveStore = async (token, data = {}) => {
    const req = JSON.stringify(data);
    return await axios({
      method: "POST",
      url: `${api()}admin/stores`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: req,
    });
  };

export const deleteStore = async (token, id) => {
    return await axios({
      method: "DELETE",
      url: `${api()}admin/stores/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };