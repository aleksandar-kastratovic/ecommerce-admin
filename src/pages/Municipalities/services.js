import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListMunicipalities = async (token, search) => {
    return await axios({
      method: "LIST",
      url: `${api()}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { search: search },
    });
  };

export const deleteMunicipality = async (token, id) => {
    return await axios({
      method: "DELETE",
      url: `${api()}${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };