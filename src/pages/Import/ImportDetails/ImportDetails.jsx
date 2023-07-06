import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAPI from "../../../api/api";
import { toast } from "react-toastify";

import IconList from "../../../helpers/icons";
import Form from "../../../components/shared/Form/Form";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import { getUrlQueryStringParam, setUrlQueryStringParam } from "../../../helpers/functions";
import Connection from "./panels/Connection";

import basic_data from "./forms/basic_data.json";

const ImportDetails = () => {

  const { spid } = useParams();
  const api = useAPI();
  const apiPath = "admin/static-pages-b2c/basic-data";
  const activeTab = getUrlQueryStringParam("tab") ?? 'basic';
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOnSubmit, setIsLoadingOnSubmit] = useState(false);

  const handleData = async () => {
    setIsLoading(true);
    api.get(`${apiPath}/${spid}`)
      .then((response) => {
        setData(response?.payload);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
  };

  const submitHandler = (data) => {
    setIsLoadingOnSubmit(true);
    let oldId = data.id;
    api.post(apiPath, data)
      .then((response) => {
        setData(response?.payload);
        if (oldId === null) {
          let tId = response?.payload?.id;
          navigate(`/import/${tId}`, { replace: true });
        }
        toast.success("Uspešno");

        setIsLoadingOnSubmit(false);
      })
      .catch((error) => {
        console.warn(error);
        toast.warn("Greška");
        setIsLoadingOnSubmit(false);
      });
  };

  useEffect(() => {
    handleData();
  }, []);

  const fields = [
    {
      id: "basic",
      name: "Osnovno",
      icon: IconList.inventory,
      enabled: true,
      component: <Form formFields={basic_data} initialData={data} onSubmit={submitHandler} isLoading={isLoadingOnSubmit} />,
    },
    {
      id: "connection",
      name: "Povezivanje",
      icon: IconList.settingsEthernet,
      enabled: data?.id,
      component: <Connection pageId={data?.id} />,
    },
  ];

  const panelHandleSelect = (field) => {
    let queryString = setUrlQueryStringParam("tab", field.id);
    const id = data.id == null ? "new" : data.id;
    navigate(`/import/${id}?${queryString}`, { replace: true });
  }

  return <DetailsPage title={data?.id == null ? "Unos nove stranice" : data?.name} fields={fields} ready={!isLoading} selectedPanel={activeTab} panelHandleSelect={panelHandleSelect} />;
};

export default ImportDetails;
