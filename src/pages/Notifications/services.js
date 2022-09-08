import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListNotifications = async (token, search, page) => {
  return await axios({
    method: "LIST",
    url: `${api()}admin/notifications/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { search: search, page: page },
  });
};

export const getNotification = async (token, id) => {
  return await axios({
    method: "GET",
    url: `${api()}admin/notifications/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveTown = async (token, data = {}) => {
  const req = JSON.stringify(data);
  return await axios({
    method: "POST",
    url: `${api()}admin/towns`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: req,
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
