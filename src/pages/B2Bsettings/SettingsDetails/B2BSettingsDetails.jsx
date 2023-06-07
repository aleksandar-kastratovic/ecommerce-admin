import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAPI from "../../../api/api";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import IconList from "../../../helpers/icons";
import B2BSettingsForm from "./panels/B2BSettingsForm";
import { getUrlQueryStringParam, setUrlQueryStringParam } from "../../../helpers/functions";

const B2BSettingsDetails = () => {

  const { B2BId } = useParams();

  const api = useAPI();
  const apiPath = "admin/configuration-b2b/main";

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    api.list(`${apiPath}/${B2BId}`)
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
  }, []);

  const fields = (data?.payload?.items ?? []).map((panel) => {
    return {
      id: panel?.id,
      name: panel?.name,
      module: panel?.module,
      submodule: panel?.submodule,
      icon: IconList.settings,
      enabled: true,
      component: <B2BSettingsForm key={panel?.id} form_slug={panel?.form_slug} module={panel?.module} submodule={panel?.submodule} config_module_id={panel?.id} />,
    };
  });

  console.log("fffff", fields[0]?.submodule)

  const activeTab = getUrlQueryStringParam("tab") ?? fields[0]?.submodule;

  // Handle after click on tab panel
  const panelHandleSelect = (field) => {
    let queryString = setUrlQueryStringParam("tab", field.id);
    navigate(`/b2b-settings/${field?.module}?${queryString}`, { replace: true });
  }

  return <DetailsPage title={B2BId} fields={fields.length > 0 ? fields : [{}]} ready={!isLoading} selectedPanel={activeTab} panelHandleSelect={panelHandleSelect} />;
};

export default B2BSettingsDetails;
