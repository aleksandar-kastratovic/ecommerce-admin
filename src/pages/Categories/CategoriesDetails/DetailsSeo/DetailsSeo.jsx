import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import List from "../../../../components/shared/ListAdder/List";
import Loading from "../../../../components/shared/Loading/Loading";

import formFields from "./formFields.json";
import AuthContext from "../../../../store/auth-contex";

const DetailsSeo = ({ gid, cid }) => {
  const init = {
    id: null,
    id_category_product: cid,
    id_country: null,
    name: null,
    slug: null,
    meta_title: null,
    meta_keywords: null,
    meta_description: null,
    meta_url: null,
    status: "on",
  };
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const { api } = authCtx;

  const handleSave = (data) => {
    api.post(`admin/category-product/seo/`, data)
      .then((response) => {
        handleList();
        toast.success("Uspešno");
      })
      .catch((error) => {
        console.warn(error);
        toast.warn("Greška");
      });
  };

  const handleDelete = (token, id) => {
    api.delete(`admin/category-product/seo/${id}`)
      .then((response) => {
        handleList();
        toast.success("Uspešno");
      })
      .catch((error) => {
        toast.warn("Greška");
        console.warn(error);
      });
  };

  const handleList = () => {
    setIsLoading(true);
    api.list(`admin/category-product/seo/${cid}`)
      .then((response) => {
        setListData(response?.payload?.items);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleList();
  }, []);

  return !isLoading ? <List listFields={listData} formFields={formFields} init={init} onSave={handleSave} onDelete={handleDelete} /> : <Loading />;
};

export default DetailsSeo;
