import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IconList from "../../../helpers/icons";
import GroupAttributes from "./GroupAttributes/GroupAttributes";
import GroupValues from "./GroupValues/GroupValues"
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import useAPI from "../../../api/api";

const ProductVariantsAttributeDetails = () => {

  const init = {
    id: null,
    slug: null,
    name: null,
    description: null,
    order: null,
    status: "on",
  };

  const { groupId } = useParams();
  const [data, setData] = useState(init);
  const [isLoading, setIsLoading] = useState(false);
  const api = useAPI();
  const apiPath = "admin/product-item-specifications/group";

  const getData = async () => {
    setIsLoading(true);
    await api
      .get(`${apiPath}/${groupId}`)
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
  }, []);

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

  return <DetailsPage title={data?.id == null ? "Nova vest" : data?.name} fields={fields} ready={!isLoading} />;
};

export default ProductVariantsAttributeDetails;
