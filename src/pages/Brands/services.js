import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListBrands = async (token, search) => {
    return await axios({
      method: "LIST",
      url: `${api()}admin/brands`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { search: search },
    });
  };

  export const getBrand = async (token, id) => {
    return await axios({
      method: "GET",
      url: `${api()}admin/brands/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const saveBrand = async (token, data = {}) => {
    const req = JSON.stringify(data);
    return await axios({
      method: "POST",
      url: `${api()}admin/brands`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: req,
    });
  };

export const deleteBrand = async (token, id) => {
    return await axios({
      method: "DELETE",
      url: `${api()}admin/brands/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };