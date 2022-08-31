import ListPage from "../../components/shared/ListPage/ListPage";
import ProductSpecsFields from "./ProductSpecsFields.json";

const ProductSpecsGroups = () => {
  return (
    <ListPage
      apiUrl="admin/productitemspec/group/list"
      deleteUrl="admin/productitemspec/group/"
      title="Speifikacije proizvoda - Grupe"
      columnFields={ProductSpecsFields}
    />
  );
};

export default ProductSpecsGroups;
