import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import List from "../../../../components/shared/ListAdder/List";

import formFields from "./formFields.json";

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
  const api = useAPI();

  const handleSave = (data) => {
    api
      .post(`admin/category_product/seo/`, data)
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
    api
      .delete(`admin/category_product/seo/${id}`)
      .then((response) => {
        toast.success("Uspešno");
      })
      .catch((error) => {
        toast.warn("Greška");
        console.warn(error);
      });
  };

  const handleList = () => {
    api
      .list(`admin/category_product/seo/${cid}`)
      .then((response) => {
        setListData(response?.payload?.items);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    handleList();
  }, []);

  return <List listFields={listData} formFields={formFields} init={init} onSave={handleSave} onDelete={handleDelete} />;
};

export default DetailsSeo;
