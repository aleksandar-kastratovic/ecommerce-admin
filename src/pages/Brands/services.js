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

export const deleteBrand = async (token, id) => {
    return await axios({
      method: "DELETE",
      url: `${api()}admin/brands/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };