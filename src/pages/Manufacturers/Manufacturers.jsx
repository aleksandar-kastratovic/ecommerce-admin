import { useContext, useState } from "react";
import ListPage from "../../components/shared/ListPage/ListPage";

import tblFields from "./tblFields.json";
import AuthContext from "../../store/auth-contex";
import ModalContent from "./ModalContent";
import { toast } from "react-toastify";

const Manufacturers = () => {
  const authCtx = useContext(AuthContext);
  const { api } = authCtx;

  const customActions = {
    delete: {
      clickHandler: {
        type: 'dialog_delete',
        fnc: (rowData, handleDeleteModalData) => {
          return {
            show: true,
            id: rowData.id,
            mutate: null,
            children: (
              <ModalContent apiPath={`admin/manufacturers/message/${rowData.id}`} rowData={rowData} handleDeleteModalData={handleDeleteModalData} />
            )
          };
        },
      },
      deleteClickHandler: {
        type: 'dialog_delete',
        fnc: (rowData, deleteModalData) => {
          api.delete(`admin/manufacturers/confirm/${rowData.id}`)
            .then(() => toast.success("Zapis je uspešno obrisan"))
            .catch(() => toast.warning("Došlo je do greške prilikom brisanja"));

          return {
            show: false,
            id: rowData.id,
            mutate: 1,
          };
        }
      },
    },
  }

  return (
    <ListPage 
      listPageId="Manufacturers" 
      apiUrl="admin/manufacturers" 
      title="Proizvođači" 
      columnFields={tblFields} 
      actionNewButton="modal" 
      customActions={customActions}
    />
  )
};

export default Manufacturers;