import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListStreets = async (token, search) => {
    return await axios({
      method: "LIST",
      url: `${api()}admin/streets`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { search: search },
    });
  };

export const deleteStreet = async (token, id) => {
    return await axios({
      method: "DELETE",
      url: `${api()}admin/streets/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };