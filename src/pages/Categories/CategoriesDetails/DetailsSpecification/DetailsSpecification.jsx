import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import List from "../../../../components/shared/ListAdder/List";

import formFields from "./formFields.json";

const DetailsSpecification = ({ gid, cid }) => {
  const init = {
    id: null,
    id_category_product: cid,
    id_set: null,
  };
  const [listData, setListData] = useState([]);
  const api = useAPI();

  const handleSave = (data) => {
    api
      .post(`admin/category_product/specifications/`, data)
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
      .delete(`admin/category_product/specifications/${id}`)
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
      .list(`admin/category_product/specifications/${cid}`)
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

export default DetailsSpecification;
