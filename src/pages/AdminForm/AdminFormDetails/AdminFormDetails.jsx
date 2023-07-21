import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IconList from "../../../helpers/icons";
import GroupAttributes from "./GroupAttributes/GroupAttributes";
import GroupValues from "./GroupValues/GroupValues"
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import useAPI from "../../../api/api";

const AdminFormDetails = () => {

  const init = {
    id: null,
    slug: "",
    module: "",
    submodule: "",
    method: "",
    action_url: "",
    description: "",
    order: 0,
  };

  const { formId } = useParams();
  const [data, setData] = useState(init);
  const [isLoading, setIsLoading] = useState(false);
  const api = useAPI();
  const apiPath = "admin/product-item-specifications/group";

  const getData = async () => {
    setIsLoading(true);
    await api
      .get(`${apiPath}/${formId}`)
      .then((response) => {
        setData(response?.payload);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, [groupId]);

  const fields = [
    {
      name: "Atributi",
      icon: IconList.attribution,
      enabled: true,
      component: <GroupAttributes groupId={data?.id} />,
    },
    {
      name: "Vrednosti",
      icon: IconList.list,
      enabled: data?.id,
      component: <GroupValues groupId={data?.id} />,
    },
  ];

  return <DetailsPage title={data?.id != null && data?.name} fields={fields} ready={!isLoading} />;
};

export default AdminFormDetails;
