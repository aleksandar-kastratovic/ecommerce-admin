import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import List from "../../../../components/shared/ListAdder/List";

import formFields from "../forms/seo.json";
import AuthContext from "../../../../store/auth-contex";

const Seo = ({ pageId }) => {

  const init = {
    id: null,
    id_static_pages: pageId,
    slug: null,
    id_country: null,
    meta_title: null,
    meta_keywords: null,
    meta_description: null,
    meta_url: null,
  };

  const [listData, setListData] = useState([]);
  const authCtx = useContext(AuthContext);
  const { api } = authCtx;
  const apiPath = "admin/static-pages-b2b/seo";

  const handleList = () => {
    api.list(`${apiPath}/${pageId}`)
      .then((response) => setListData(response?.payload?.items))
      .catch((error) => console.warn(error));
  };

  const handleSubmit = (data) => {
    api.post(apiPath, data)
      .then((response) => {
        handleList();
        toast.success("Uspešno");
      })
      .catch((error) => {
        console.warn(error);
        toast.warn(error);
      });
  };

  const handleDelete = (token, id) => {
    api.delete(`${apiPath}/${id}`)
      .then((response) => {
        handleList();
        toast.success("Uspešno");
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
