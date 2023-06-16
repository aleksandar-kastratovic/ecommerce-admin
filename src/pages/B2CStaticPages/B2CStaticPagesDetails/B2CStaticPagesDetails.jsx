import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAPI from "../../../api/api";
import { toast } from "react-toastify";

import IconList from "../../../helpers/icons";
import Form from "../../../components/shared/Form/Form";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import Seo from "./panels/Seo";
import Content from "./panels/Content";

import basic_data from "./forms/basic_data.json";



const StaticPagesDetails = () => {

  const { spid } = useParams();
  const api = useAPI();
  const apiPath = "admin/news-b2c/news/basic-data";

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
    api.post(apiPath, data)
      .then((response) => {
        toast.success("Uspešno")
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
      name: "Osnovno",
      icon: IconList.inventory,
      enabled: true,
      component: <Form formFields={basic_data} initialData={data} onSubmit={submitHandler} isLoading={isLoadingOnSubmit} />,
    },
    {
      name: "Sadržaj",
      icon: IconList.list,
      enabled: data?.id,
      component: <Content pageId={data?.id} />,
    },
    {
      name: "SEO",
      icon: IconList.search,
      enabled: data?.id,
      component: <Seo pageId={data?.id} />,
    },
  ];

  return <DetailsPage title={data?.id == null ? "Unos nove stranice" : data?.title} fields={fields} ready={!isLoading} />;
};

export default StaticPagesDetails;
