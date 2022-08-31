import ListPage from "../../components/shared/ListPage/ListPage";

import tblFields from "./ProductColumnFields.json";

const Products = () => {
  return (
    <ListPage
      apiUrl="admin/productitems/list"
      title="Proizvodi"
      columnFields={tblFields}
    />
  );
};

export default Products;
