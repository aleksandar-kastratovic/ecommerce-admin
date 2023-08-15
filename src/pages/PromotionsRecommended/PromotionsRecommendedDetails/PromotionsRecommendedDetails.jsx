import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../api/api";
import IconList from "../../../helpers/icons";
import Form from "../../../components/shared/Form/Form";
import basic_data from "./forms/basic_data.json";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import { deepClone } from "@mui/x-data-grid/utils/utils";
import ConditionsOne from "./panels/ConditionsOne/Conditions";
import ConditionsTwo from "./panels/ConditionsTwo/Conditions";
import { getUrlQueryStringParam, setUrlQueryStringParam } from "../../../helpers/functions";

const PromotionsRecommendedDetails = () => {
  const { rid } = useParams();
  const api = useAPI();
  const apiPath = "admin/campaigns/cart-delivery/basic-data";
  const navigate = useNavigate();
  const activeTab = getUrlQueryStringParam("tab") ?? 'basic';

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
  let slugField = newFields.map((field) => {
    if (field.prop_name === "system" && rid !== "new") {
      return { ...field, disabled: true };
    } else {
      return field;
    }
  }).filter((field) => !(field.prop_name === "slug" && rid === "new"));


  const handleData = async () => {
    setIsLoading(true);
    api.get(`${apiPath}/${rid}`)
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
          navigate(`/promotions-recommended/${tId}`, { replace: true });
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
      id: "basic",
      name: "Osnovno",
      icon: IconList.inventory,
      enabled: true,
      component: <Form formFields={slugField} initialData={data} onSubmit={saveData} isLoading={isLoadingOnSubmit} />,
    },
    {
      id: "conditionsOne",
      name: "Uslovi - 1",
      icon: IconList.settings,
      enabled: data?.id,
      component: <ConditionsOne campaignId={data?.id} />,
    },
    {
      id: "conditionsTwo",
      name: "Uslovi - 2",
      icon: IconList.settings,
      enabled: data?.id,
      component: <ConditionsTwo campaignId={data?.id} />,
    },
  ];

  // Handle after click on tab panel
  const panelHandleSelect = (field) => {
    let queryString = setUrlQueryStringParam("tab", field.id);
    const id = data.id == null ? "new" : data.id;
    navigate(`/promotions-recommended/${id}?${queryString}`, { replace: true });
  }

  return <DetailsPage title={data?.id == null ? "Promocija" : data?.name} fields={fields} ready={[rid === "new" || data?.id]} selectedPanel={activeTab} panelHandleSelect={panelHandleSelect} />;
};

export default PromotionsRecommendedDetails;
