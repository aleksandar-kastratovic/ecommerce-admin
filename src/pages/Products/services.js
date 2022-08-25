import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListProducts = async (token, search = "") => {
  return await axios({
    method: "LIST",
    url: `${api()}admin/productitems/list`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { search: search },
  });
};

export const getProductSlugData = async (token, product_id = 0, slug = "") => {
  return await axios({
    method: "GET",
    url: `${api()}admin/productitems/${slug}/${product_id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postProductSlugData = async (token, data = {}, slug = "") => {
  return await axios({
    method: "POST",
    url: `${api()}admin/productitems/${slug}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
};
