import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListNewsletter = async (token, search) => {
    return await axios({
      method: "LIST",
      url: `${api()}admin/newsletter-b2c/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { search: search },
    });
  };

  export const getNewsletter= async (token, id) => {
    return await axios({
      method: "GET",
      url: `${api()}admin/newsletter-b2c/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const saveNewsletter= async (token, data = {}) => {
    const req = JSON.stringify(data);
    return await axios({
      method: "POST",
      url: `${api()}admin/newsletter-b2c/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: req,
    });
  };

export const deleteNewsletter = async (token, id) => {
    return await axios({
      method: "DELETE",
      url: `${api()}admin/newsletter-b2c/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };