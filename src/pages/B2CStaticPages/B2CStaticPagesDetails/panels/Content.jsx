import React from 'react';
import ListPage from '../../../../components/shared/ListPage/ListPage';
import useAPI from '../../../../api/api';
import formFields from '../forms/content.json';

const Content = () => {
  const api = useAPI();

  // const customActions = {
  //   delete: {
  //     clickHandler: {
  //       type: 'dialog_delete',
  //       fnc: (rowData, handleDeleteModalData) => {
  //         return {
  //           show: true,
  //           id: rowData.id,
  //           mutate: null,
  //           children: (
  //             <ModalContent apiPath={`admin/product-items-variants-attributes/group-attribute/message/${rowData.id}`} rowData={rowData} handleDeleteModalData={handleDeleteModalData} />
  //           )
  //         };
  //       },
  //     },
  //     deleteClickHandler: {
  //       type: 'dialog_delete',
  //       fnc: (rowData, deleteModalData) => {

  //         api.delete(`admin/product-items-variants-attributes/group-attribute/confirm/${rowData.id}?delete_product_attributes=${deleteModalData.delete_product_attributes}`)
  //           .then(() => toast.success("Zapis je uspešno obrisan"))
  //           .catch(() => toast.warning("Došlo je do greške prilikom brisanja"));

  //         return {
  //           show: false,
  //           id: rowData.id,
  //           mutate: 1,
  //         };
  //       }
  //     },
  //   },
  // };

  return (
    <>
      <ListPage
        listPageId="B2CContent"
        apiUrl={`admin/product-items-variants-attributes/group-attribute`}
        editUrl={`admin/product-items-variants-attributes/group-attribute`}
        title=" "
        columnFields={formFields}
        actionNewButton="modal"
      />
    </>
  );
}

export default Content