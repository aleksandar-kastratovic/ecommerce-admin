import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useAPI from "../../../api/api";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import IconList from "../../../helpers/icons";
import B2BSettingsForm from "./panels/B2BSettingsForm";

const B2BSettingsDetails = () => {

  const { B2BId } = useParams();

  const api = useAPI();
  const apiPath = "admin/configuration-b2b/main";

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      name: panel?.name,
      icon: IconList.settings,
      enabled: true,
      component: <B2BSettingsForm key={panel?.id} form_slug={panel?.form_slug} module={panel?.module} submodule={panel?.submodule} config_module_id={panel?.id} />,
    };
  });

  return <DetailsPage title={B2BId} fields={fields.length > 0 ? fields : [{}]} ready={!isLoading} />;
};

export default B2BSettingsDetails;
