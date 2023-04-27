import { useState } from "react";
import ListPage from "../../components/shared/ListPage/ListPage";

import tblFields from "./ProductColumnFields.json";
import listCheckbox from "./listCheckbox.json";
import ModalForm from "../../components/shared/Modal/ModalForm";

const Products = () => {

  const [openModal, setOpenModal] = useState({ show: false, id: null });

  const customActions = {
    type1: { handler: (rowData) => { console.log(rowData.id); setOpenModal({ show: true, id: rowData.id }) }, icon: "content_copy" }
  };


  return (
    <>
      <ListPage
        apiUrl="admin/product-items/list"
        deleteUrl="admin/product-items/basic-data"
        title="Proizvodi"
        columnFields={tblFields}
        customActions={customActions}
      />
      <ModalForm anchor="right" openModal={openModal} setOpenModal={setOpenModal} formFields={listCheckbox} sx={{ padding: "2rem" }} apiPathFormModal="admin/product-items/basic-data" label="Dupliraj" customTitle="Da li ste sigurni da želite da duplirate za proizvod" />
    </>
  );
};

export default Products;
