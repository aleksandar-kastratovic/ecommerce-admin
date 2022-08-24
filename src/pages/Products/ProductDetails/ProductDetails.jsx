import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import { useParams } from "react-router-dom";

import detailsList from "./DetailsListData.json";
import fields from "./DetailsListFields.json";

const ProductDetails = () => {
  const { prodId } = useParams();
  console.log(prodId);
  return (
    <DetailsPage
      title="Product details"
      backButton={true}
      backPath="/products"
      hasList={true}
      detailsList={detailsList}
      fields={fields}
      onChangeSelected={(selected) => {
        console.log(selected);
      }}
      main={<p>Test</p>}
    />
  );
};

export default ProductDetails;
