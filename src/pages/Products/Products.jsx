import { useState } from "react";
import ListPage from "../../components/shared/ListPage/ListPage";

import tblFields from "./tblFields.json";
import listCheckbox from "./listCheckbox.json";
import ModalForm from "../../components/shared/Modal/ModalForm";

const Products = () => {

  const [openModal, setOpenModal] = useState({ show: false, id: null, name: null });

  const customActions = {
    contentCopy: {
      type: "custom",
      display: true,
      position: 2,
      clickHandler: {
        type: '',
        fnc: (rowData) => {
          return setOpenModal({ show: true, id: rowData.id, name: rowData.name });
        },
      },
      icon: "content_copy",
      title: "Dupliraj"
    }
  };


  return (
    <>
      <ListPage
        listPageId="Products"
        apiUrl="admin/product-items/list"
        deleteUrl="admin/product-items/basic-data"
        title="Proizvodi"
        columnFields={tblFields}
        customActions={customActions}
      />
      <ModalForm
        anchor="right"
        openModal={openModal}
        setOpenModal={setOpenModal}
        formFields={listCheckbox}
        sx={{ padding: "2rem" }}
        apiPathFormModal="admin/product-items/list/clone"
        initialData={{ id_product: openModal.id }}
        withoutSetterFunction
        cancelButton
        label="Dupliraj"
        styleCheckbox={{ padding: "0 0.563rem 0 0.563rem" }}
        customTitle={`Da li ste sigurni da želite da duplirate proizvod ${openModal.name}?`}
        shortText="Dupliranjem se automatski dupliraju sledeći podaci proizvoda: Osnovno, Opis, Deklarijacija. Pored navedenih podataka možete odabrati koje još podatke želite da duplirate za novi proizvod."
      />
    </>
  );
};

export default Products;
