import ListPage from "../../components/shared/ListPage/ListPage";
import ProductSpecsFields from "./ProductSpecsFields.json";
import { deleteProductSpecsGroup, getListProductSpecsGroup } from "./services";

const ProductSpecsGroups = () => {
  return (
    <ListPage
      getData={getListProductSpecsGroup}
      deleteData={deleteProductSpecsGroup}
      title="Speifikacije proizvoda - Grupe"
      showNewButton={true}
      newPath="/product-specs/groups/new"
      columnFields={ProductSpecsFields}
      showToolbar={true}
      editPath="/product-specs/groups/"
      deleteTitle="Brisanje"
      deleteDescription="Da li ste sigurni da želite da obrišete?"
      showDatePicker={false}
    />
  );
};

export default ProductSpecsGroups;
