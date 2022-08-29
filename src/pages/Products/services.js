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

export const getListProductSection = async (token, data = {}, slug = "") => {
  return await axios({
    method: "LIST",
    url: `${api()}admin/productitems/${slug}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
};

export const getProductSpecsSetDDL = async (token) => {
  return await axios({
    method: "GET",
    url: `${api()}admin/productitems/specifications/ddl/prodspecset`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getListSetByProductID = async (token, id) => {
  return await axios({
    method: "LIST",
    url: `${api()}admin/productitems/specifications/product/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getGrupsBySetID = async (token, setId) => {
  return await axios({
    method: "GET",
    url: `${api()}admin/productitems/specifications/set/${setId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getFieldsByGroupId = async (token, groupID) => {
  return await axios({
    method: "GET",
    url: `${api()}admin/productitems/specifications/group/${groupID}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postProductGroupAttribute = async (token, data = {}) => {
  return await axios({
    method: "POST",
    url: `${api()}admin/productitems/specifications`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
};

export const getProductGroupAttributeDDL = async (
  token,
  idGroup,
  idAttribute
) => {
  return await axios({
    method: "GET",
    url: `${api()}admin/productitems/specifications/ddl/prodspecattrval/${idGroup}/${idAttribute}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
