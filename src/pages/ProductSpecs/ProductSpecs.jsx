import { useNavigate } from "react-router-dom";
import ListPage from "../../components/shared/ListPage/ListPage";
import ProductSpecsFields from "./ProductSpecsFields.json";

const ProductSpecs = () => {
  const navigate = useNavigate();
  const groupPage = () => {
    navigate("/product-specs/groups");
  };

  const buttons = [{ id: 1, label: "Grupe", action: groupPage }];

  return (
    <ListPage
      title="Speifikacije proizvoda - Setovi"
      apiUrl="admin/productitemspec/set/list"
      deleteUrl="admin/productitemspec/groupattributevalues"
      columnFields={ProductSpecsFields}
      additionalButtons={buttons}
    />
  );
};

export default ProductSpecs;
