import { useNavigate } from "react-router-dom";
import ListPage from "../../components/shared/ListPage/ListPage";
import ProductSpecsFields from "./ProductSpecsFields.json";
import { getListProductSpecsSet, deleteProductSpecsSet } from "./services";

const ProductSpecs = () => {
  const navigate = useNavigate();
  const groupPage = () => {
    navigate("/product-specs/groups");
  };

  const buttons = [{ id: 1, text: "Grupe", action: groupPage }];

  return (
    <ListPage
      getData={getListProductSpecsSet}
      deleteData={deleteProductSpecsSet}
      title="Speifikacije proizvoda - Setovi"
      showNewButton={true}
      newPath="/product-specs/new"
      columnFields={ProductSpecsFields}
      showToolbar={true}
      editPath="/product-specs/"
      deleteTitle="Brisanje"
      deleteDescription="Da li ste sigurni da želite da obrišete?"
      showDatePicker={false}
      additionalButtons={buttons}
    />
  );
};

export default ProductSpecs;
