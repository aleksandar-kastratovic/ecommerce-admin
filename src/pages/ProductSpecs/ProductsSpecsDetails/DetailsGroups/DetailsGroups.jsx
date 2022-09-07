import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import List from "../../../../components/shared/ListAdder/List";

import formFields from "./formFields.json";

const DetailsGroups = ({ specId }) => {
  const [listFields, setListFields] = useState([]);
  const navigate = useNavigate();
  const api = useAPI();

  const listInit = {
    id_set: specId,
    id: null,
    order: null,
    status: null,
  };

  const onSave = (data) => {
    api
      .post("admin/product-item-specifications/setgroup/", data)
      .then((response) => {
        console.log(response);
        toast.success("Uspešno!");
      })
      .catch((error) => {
        console.warn(error.response);
        toast.warning("Greška ");
      });
  };

  useEffect(() => {
    api
      .list("admin/product-item-specifications/setgroup", {
        filter_id_set: specId,
      })
      .then((response) => {
        setListFields(response?.payload?.items);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  const listButtons = [
    {
      id: 1,
      text: "Kreiraj grupu",
      action: () => {
        navigate(`/product-specs/groups/new`);
      },
    },
  ];

  return <List listFields={listFields} formFields={formFields} init={listInit} onDelete={() => {}} onSave={onSave} additionalButtons={listButtons} />;
};

export default DetailsGroups;
