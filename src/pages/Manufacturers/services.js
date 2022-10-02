import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListManufacturers = async (token, search) => {
    return await axios({
      method: "LIST",
      url: `${api()}admin/manufacturers`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { search: search },
    });
  };

  export const getManufacturer = async (token, id) => {
    return await axios({
      method: "GET",
      url: `${api()}admin/manufacturers/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const saveManufacturer = async (token, data = {}) => {
    const req = JSON.stringify(data);
    return await axios({
      method: "POST",
      url: `${api()}admin/manufacturers`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: req,
    });
  };

export const deleteManufacturer = async (token, id) => {
    return await axios({
      method: "DELETE",
      url: `${api()}admin/manufacturers/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };