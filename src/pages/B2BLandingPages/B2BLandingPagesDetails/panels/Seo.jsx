import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import List from "../../../../components/shared/ListAdder/List";

import formFields from "../forms/seo.json";

const Seo = ({ pageId }) => {

  const init = {
    id: null,
    id_landing_page: pageId,
    id_country: null,
    lang: null,
    slug: null,
    meta_title: null,
    meta_keywords: null,
    meta_description: null,
    meta_url: null,
  };

  const [listData, setListData] = useState([]);
  const api = useAPI();
  const apiPath = "admin/landing-pages-b2b/seo";

  const handleList = () => {
    api.list(`${apiPath}/${pageId}`)
      .then((response) => setListData(response?.payload?.items))
      .catch((error) => console.warn(error));
  };

  const handleSubmit = (data) => {
    api.post(apiPath, data)
      .then((response) => {
        toast.success("Uspešno");
        handleList();
      })
      .catch((error) => {
        console.warn(error);
        toast.warn(error);
      });
  };

  const handleDelete = (token, id) => {
    api.delete(`${apiPath}/${id}`)
      .then((response) => {
        toast.success("Uspešno");
        handleList();
      })
      .catch((error) => {
        console.warn(error);
        toast.warn(error);
      });
  };

  useEffect(() => {
    handleList();
  }, []);

  return <List formFields={formFields} init={init} listFields={listData} onSave={handleSubmit} onDelete={handleDelete} />;
};

export default Seo;
