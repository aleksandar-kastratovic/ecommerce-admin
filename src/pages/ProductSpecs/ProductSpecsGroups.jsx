import { useNavigate } from "react-router-dom";
import ListPage from "../../components/shared/ListPage/ListPage";
import ProductSpecsFields from "./ProductSpecsFields.json";

const ProductSpecsGroups = () => {
  const navigate = useNavigate();
  const buttons = [
    {
      id: 1,
      label: "Setovi",
      action: () => {
        navigate("/product-specs");
      },
    },
  ];

  return <ListPage apiUrl="admin/product-item-specifications/group" title="Speifikacije proizvoda - Grupe" columnFields={ProductSpecsFields} additionalButtons={buttons} />;
};

export default ProductSpecsGroups;
