import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListMunicipalities = async (token, search) => {
    return await axios({
      method: "LIST",
      url: `${api()}admin/municipalities`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { search: search },
    });
  };
  export const getMunicipality = async (token, id) => {
    return await axios({
      method: "GET",
      url: `${api()}admin/municipalities/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const saveMunicipality = async (token, data = {}) => {
    const req = JSON.stringify(data);
    return await axios({
      method: "POST",
      url: `${api()}admin/municipalities`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: req,
    });
  };


export const deleteMunicipality = async (token, id) => {
    return await axios({
      method: "DELETE",
      url: `${api()}admin/municipalities/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };