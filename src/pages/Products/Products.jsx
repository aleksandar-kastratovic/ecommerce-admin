import { useState } from "react";
import ListPage from "../../components/shared/ListPage/ListPage";

import tblFields from "./ProductColumnFields.json";

const Products = () => {
  const customActions = {
    type1: { handler: () => { }, icon: "content_copy" }
  };
  return (
    <ListPage
      apiUrl="admin/product-items/list"
      deleteUrl="admin/product-items/basic-data"
      title="Proizvodi"
      columnFields={tblFields}
      customActions={customActions}
    />
  );
};

export default Products;
