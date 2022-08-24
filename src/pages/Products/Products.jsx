import ListPage from "../../components/shared/ListPage/ListPage";

import tblFields from "./ProductColumnFields.json";

const Products = () => {
  return (
    <ListPage
      getData={() => {}}
      deleteData={() => {}}
      title="Proizvodi"
      showNewButton={true}
      newPath="/products/new"
      columnFields={tblFields}
      showToolbar={true}
      editPath="/products/"
      deleteTitle="Brisanje"
      deleteDescription="Da li ste sigurni da želite da obrišete?"
      showDatePicker={false}
    />
  );
};

export default Products;
