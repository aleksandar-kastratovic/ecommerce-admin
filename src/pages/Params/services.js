import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListParams = async (token, search) => {
  return await axios({
    method: "LIST",
    url: `${api()}admin/params/main/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { search: search },
  });
};
