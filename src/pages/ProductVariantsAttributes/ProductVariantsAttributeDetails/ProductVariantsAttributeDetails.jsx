import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IconList from "../../../helpers/icons";
import GroupAttributes from "./GroupAttributes/GroupAttributes";
import GroupValues from "./GroupValues/GroupValues"
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import useAPI from "../../../api/api";

const ProductVariantsAttributeDetails = () => {

  const fields = [
    {
      name: "Atributi",
      icon: IconList.attribution,
      enabled: true,
      component: <GroupAttributes />,
    },
    {
      name: "Vrednosti",
      icon: IconList.list,
      enabled: true,
      component: <GroupValues />,
    },
  ];

  return <DetailsPage title="Atributi za varijacije" fields={fields} />;
};

export default ProductVariantsAttributeDetails;
