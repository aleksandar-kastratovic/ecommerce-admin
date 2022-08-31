import axios from "axios";

const api = () => {
  return localStorage.getItem("api");
  // return apiLocal;
};

export const getListNews = async (token, search) => {
    return await axios({
      method: "LIST",
      url: `${api()}admin/news_b2c/b2c_news/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { search: search },
    });
  };

  export const getNews = async (token, id) => {
    return await axios({
      method: "GET",
      url: `${api()}admin/news_b2c/b2c_news/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const saveNews= async (token, data = {}) => {
    const req = JSON.stringify(data);
    return await axios({
      method: "POST",
      url: `${api()}admin/news_b2c/b2c_news/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: req,
    });
  };

export const deleteNews = async (token, id) => {
    return await axios({
      method: "DELETE",
      url: `${api()}admin/news_b2c/b2c_news/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };