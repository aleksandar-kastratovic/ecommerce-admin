import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListCountries = async (token, search) => {
    return await axios({
      method: "LIST",
      url: `${api()}admin/countries`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { search: search },
    });
  };

  export const getCountry = async (token, id) => {
    return await axios({
      method: "GET",
      url: `${api()}admin/countries/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const saveCountry = async (token, data = {}) => {
    const req = JSON.stringify(data);
    return await axios({
      method: "POST",
      url: `${api()}admin/countries`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: req,
    });
  };

export const deleteCountry = async (token, id) => {
    return await axios({
      method: "DELETE",
      url: `${api()}admin/countries/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };