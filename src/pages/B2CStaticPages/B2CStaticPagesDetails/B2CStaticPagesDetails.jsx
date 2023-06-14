import { useParams } from "react-router-dom";
import useAPI from "../../../api/api";
import Form from "../../../components/shared/Form/Form";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
// import Seo from "./panels/Seo";

import formFields from "./formField.json";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const StaticPagesDetails = () => {
  const { spid } = useParams();
  const api = useAPI();

  const apiPath = "admin/static-pages-b2c/page";

  const { data, isLoading } = useQuery(["staticPage"], () => api.get(`${apiPath}/${spid}`).then((response) => response?.payload));

  const submitHandler = (data) => {
    api.post(apiPath, data)
      .then((response) => toast.success("Uspešno"))
      .catch((error) => {
        console.warn(error);
        toast.warn("Greška");
      });
  };

  const fields = [
    {
      name: "Osnovno",
      icon: "settings",
      enabled: true,
      component: <Form formFields={formFields} initialData={data} onSubmit={submitHandler} />,
    },
    {
      name: "Seo",
      icon: "settings",
      enabled: data?.id,
      component: <Seo apiPath={apiPath} spid={spid} />,
    },
  ];

  return <DetailsPage title={data?.id == null ? "Unos nove strane" : data?.title} fields={fields} ready={!isLoading} />;
};

export default StaticPagesDetails;
