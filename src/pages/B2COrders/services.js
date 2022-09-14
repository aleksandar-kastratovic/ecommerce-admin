import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListB2COrders = async (token, search) => {
    return await axios({
      method: "LIST",
      url: `${api()}admin/orders_b2c/order/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { search: search },
    });
  };

  export const getB2COrders= async (token, id) => {
    return await axios({
      method: "GET",
      url: `${api()}admin/orders_b2c/order/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const saveB2COrders= async (token, data = {}) => {
    const req = JSON.stringify(data);
    return await axios({
      method: "POST",
      url: `${api()}admin/orders_b2c/order/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: req,
    });
  };

export const deleteB2COrders = async (token, id) => {
    return await axios({
      method: "DELETE",
      url: `${api()}admin/orders_b2c/order/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };