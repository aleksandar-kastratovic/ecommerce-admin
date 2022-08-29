import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListTowns = async (token, search) => {
    return await axios({
      method: "LIST",
      url: `${api()}admin/towns`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { search: search },
    });
  };

  export const getTown = async (token, id) => {
    return await axios({
      method: "GET",
      url: `${api()}admin/towns/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const saveTown = async (token, data = {}) => {
    const req = JSON.stringify(data);
    return await axios({
      method: "POST",
      url: `${api()}admin/towns`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: req,
    });
  };

export const deleteTown = async (token, id) => {
    return await axios({
      method: "DELETE",
      url: `${api()}admin/towns/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };