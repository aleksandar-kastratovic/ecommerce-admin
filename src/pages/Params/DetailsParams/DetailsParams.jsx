import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAPI from "../../../api/api";
import List from "../../../components/shared/ListAdder/List";

import ParamsForm from "./ParamsForm/ParamsForm";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";

import long_text from "./forms/long_text.json";
import number from "./forms/number.json";
import date from "./forms/date.json";
import datetime from "./forms/datetime.json";
import image from "./forms/image.json";
import image_description from "./forms/image_description.json";
import slug from "./forms/slug.json";
import status from "./forms/status.json";

const init = {
  id: null,
  field_type: null,
  field_is_multiple: false,
  field_description: null,
  slug: null,
  name: null,
  int_value: null,
  text_value: null,
  datetime_value: null,
  title: null,
  subtitle: null,
  description: null,
  image: null,
  button: null,
  target: null,
  url: null,
  active_from: null,
  active_to: null,
  status: "on",
};

const listInit = {
  id: null,
  id_params: null,
  slug: null,
  name: null,
  int_value: null,
  text_value: null,
  datetime_value: null,
  title: null,
  subtitle: null,
  description: null,
  button: null,
  target: null,
  url: null,
  position: null,
  image: null,
  video: null,
  download: null,
  status: "on",
};

const ParamsDetails = () => {
  const { pid } = useParams();
  const [data, setData] = useState(init);
  const [list, setList] = useState([]);

  const api = useAPI();

  const onSubmit = (data) => {
    api
      .post(`admin/params/main/`, { ...init, ...data })
      .then((response) => {
        toast.success("Uspešno");
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const onChange = (data) => {
    setData(data);
  };

  const handleGetData = () => {
    api
      .get(`admin/params/main/${pid}`)
      .then((response) => {
        setData(response?.payload);
      })
      .catch((error) => {
        console.warn(error);
      });
  };
  const handleGetList = () => {
    api
      .list(`admin/params/values/`, { id_param: pid })
      .then((response) => {
        console.log(response?.payload?.items);
        setList(response?.payload?.items);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const onDelete = (token, id) => {
    api
      .delete(`admin/params/values/${id}`)
      .then((response) => {
        toast.success("Uspešno");
        handleGetList();
      })
      .catch((error) => {
        toast.warning("Greška");
        console.warn(error);
      });
  };

  const handleListSubmit = async (data) => {
    await api
      .post("admin/params/values/", { ...data, id_params: pid })
      .then((response) => {
        handleGetList();
        toast.success("Uspešno");
      })
      .catch((error) => {
        toast.warning("Greška");
        console.warn(error);
      });
  };

  useEffect(() => {
    handleGetData();
  }, []);

  useEffect(() => {
    if (data.field_is_multiple) {
      handleGetList();
    }
  }, [data]);

  const getParamSubForm = (form) => {
    if (data.field_is_multiple && form) {
      return [];
    }
    switch (data.field_type) {
      case "long_text":
        return long_text;
      case "number":
        return number;
      case "date":
        return date;
      case "datetime":
        return datetime;
      case "image":
        return image;
      case "image_description":
        return image_description;
      default:
        return [];
    }
  };

  const fields = [
    {
      id: 1,
      name: "Osnovno",
      icon: "settings",
      disabled: false,
      component: (
        <ParamsForm
          onSubmit={onSubmit}
          data={data}
          onChange={onChange}
          subForm={getParamSubForm(true)}
        />
      ),
    },
    {
      id: 2,
      name: "Vrednosti",
      icon: "settings",
      disabled: false,
      component: (
        <List
          formFields={[slug, ...getParamSubForm(false), status]}
          listFields={list}
          onSave={handleListSubmit}
          addFieldLabel={"Dodaj polje"}
          onDelete={onDelete}
          init={listInit}
        />
      ),
    },
  ];

  return (
    <DetailsPage
      title="Detalji paramtera"
      fields={data.field_is_multiple && pid !== "new" ? fields : [fields[0]]}
    />
  );
};

export default ParamsDetails;
