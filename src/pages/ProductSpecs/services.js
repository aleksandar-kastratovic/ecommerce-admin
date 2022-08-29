import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListProductSpecsSet = async (token, search = "") => {
  return await axios({
    method: "LIST",
    url: `${api()}admin/productitemspec/set/list`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { search: search },
  });
};

export const deleteProductSpecsSet = async (token, id) => {
  return await axios({
    method: "DELETE",
    url: `${api()}admin/productitemspec/groupattributevalues/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProductSpecsSet = async (token, id) => {
  return await axios({
    method: "GET",
    url: `${api()}admin/productitemspec/set/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postProductSpecsSet = async (token, data = {}) => {
  return await axios({
    method: "POST",
    url: `${api()}admin/productitemspec/set/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
};

export const getListProductSpecsGroup = async (token, search = "") => {
  return await axios({
    method: "LIST",
    url: `${api()}admin/productitemspec/group/list`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { search: search },
  });
};

export const deleteProductSpecsGroup = async (token, id) => {
  return await axios({
    method: "DELETE",
    url: `${api()}admin/productitemspec/group/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProductSpecsGroup = async (token, id) => {
  return await axios({
    method: "GET",
    url: `${api()}admin/productitemspec/group/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postProductSpecsGroup = async (token, data = {}) => {
  return await axios({
    method: "POST",
    url: `${api()}admin/productitemspec/group/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
};

export const postProductGroupAttribute = async (token, data = {}) => {
  return await axios({
    method: "POST",
    url: `${api()}admin/productitemspec/groupattribute/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
};

export const getListProductAttributes = async (token, groupId) => {
  return await axios({
    method: "LIST",
    url: `${api()}admin/productitemspec/groupattribute/list`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      filter_id_group: groupId,
    },
  });
};

export const deleteProductSpecsGroupAttribute = async (token, id) => {
  return await axios({
    method: "DELETE",
    url: `${api()}admin/productitemspec/groupattribute/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getListProductSpecsGroupAttributeValues = async (
  token,
  groupId,
  attributeId
) => {
  return await axios({
    method: "LIST",
    url: `${api()}admin/productitemspec/groupattributevalues/list`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      filter_id_group: groupId,
      filter_id_attribute: attributeId,
    },
  });
};

export const deleteProductSpecsGroupAttributeValues = async (token, id) => {
  return await axios({
    method: "DELETE",
    url: `${api()}admin/productitemspec/groupattributevalues/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postProductSpecsGroupAttributeValues = async (
  token,
  data = {}
) => {
  return await axios({
    method: "POST",
    url: `${api()}admin/productitemspec/groupattributevalues/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
};

export const getListSetGroups = async (token, idSet) => {
  return await axios({
    method: "LIST",
    url: `${api()}admin/productitemspec/setgroup/list`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      filter_id_set: idSet,
    },
  });
};

export const postSetGroup = async (token, data) => {
  return await axios({
    method: "POST",
    url: `${api()}admin/productitemspec/setgroup/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
};
