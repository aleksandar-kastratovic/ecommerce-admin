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

export const deleteTown = async (token, id) => {
    return await axios({
      method: "DELETE",
      url: `${api()}admin/towns/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };