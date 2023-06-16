import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../api/api";
import IconList from "../../../helpers/icons";
import Form from "../../../components/shared/Form/Form";

import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import Conditions from "./panels/Conditions";
import CalculateForm from "./panels/CalculateForm/CalculateForm";

import basic_data from "./forms/basic_data.json";
import { deepClone } from "@mui/x-data-grid/utils/utils";

const PromotionsCatalogCampaignsPageDetails = () => {
  const { nid } = useParams();
  const api = useAPI();
  const apiPath = "admin/campaigns/product-catalog/basic-data";
  const navigate = useNavigate();

  const init = {
    id: null,
    calculation_type: null,
    description: null,
    slug: null,
    name: null,
    description: null,
    from: null,
    to: null,
    order: null,
    status: "on",
    system: null,
    id_country: null,
  };

  const [data, setData] = useState(init);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOnSubmit, setIsLoadingOnSubmit] = useState(false);

  const [formFields, setFormFields] = useState(basic_data);
  let newFields = deepClone(formFields);
  let slugField = newFields.filter((field) => !(field.prop_name === "slug" && nid === "new"));

  const handleData = async () => {
    setIsLoading(true);
    api.get(`${apiPath}/${nid}`)
      .then((response) => {
        setData(response?.payload);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
  };

  const saveData = async (data) => {
    setIsLoadingOnSubmit(true);
    let oldId = data.id;
    api.post(apiPath, data)
      .then((response) => {
        setData(response?.payload);
        toast.success("Uspešno");

        if (oldId === null) {
          let tId = response?.payload?.id;
          navigate(`/promotions-catalog-campaigns/${tId}`, { replace: true });
        }
        setIsLoadingOnSubmit(false);
      })
      .catch((error) => {
        console.warn(error);
        toast.warning("Greška");
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
      component: <Form formFields={slugField} initialData={data} onSubmit={saveData} isLoading={isLoadingOnSubmit} />,
    },
    {
      name: "Uslovi",
      icon: IconList.settings,
      enabled: data?.id,
      component: <Conditions campaignId={data?.id} />,
    },
    {
      name: "Obračun",
      icon: IconList.calculate,
      enabled: data?.id,
      component: <CalculateForm campaignId={data?.id} />,
    },
  ];

  return <DetailsPage title={data?.id == null ? "Promocija" : data?.name} fields={fields} ready={[nid === "new" || data?.id]} />;
};

export default PromotionsCatalogCampaignsPageDetails;
