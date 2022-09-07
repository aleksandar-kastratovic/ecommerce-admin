import { useNavigate } from "react-router-dom";
import ListPage from "../../components/shared/ListPage/ListPage";
import ProductSpecsFields from "./ProductSpecsFields.json";

const ProductSpecs = () => {
  const navigate = useNavigate();

  const buttons = [
    {
      id: 1,
      label: "Grupe",
      action: () => {
        navigate("/product-specs/groups");
      },
    },
  ];

  return (
    <ListPage
      title="Speifikacije proizvoda - Setovi"
      apiUrl="admin/product-item-specifications/set"
      columnFields={ProductSpecsFields}
      additionalButtons={buttons}
    />
  );
};

export default ProductSpecs;
