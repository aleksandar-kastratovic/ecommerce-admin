import { useContext } from "react";
import { toast } from "react-toastify";

import formFields from "../forms/inventories.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../store/auth-contex";


const Inventories = ({ productId }) => {
  const authCtx = useContext(AuthContext);
  const { api } = authCtx;

  const navigate = useNavigate();

  const customActions = {
    delete: {
      clickHandler: {
        type: 'dialog_delete',
        fnc: (rowData) => {
          return {
            show: true,
            id: rowData.id,
            mutate: null,
          };
        },
      },
      deleteClickHandler: {
        type: 'dialog_delete',
        fnc: (rowData) => {

          api.delete(`admin/product-items/inventories/${rowData.id}`)
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
  };

  const additionalButtons = [
    {
      label: "Skladišta",
      action: () => {
        navigate("/stores");
      },
    },
  ];

  return (
    <>
      <ListPage
        listPageId="Inventories"
        apiUrl={`admin/product-items/inventories/${productId}`}
        editUrl={`admin/product-items/inventories`}
        title=" "
        columnFields={formFields}
        initialData={{ id_product: productId }}
        actionNewButton="modal"
        addFieldLabel="Dodajte novi lager"
        showAddButton={true}
        customActions={customActions}
        additionalButtons={additionalButtons}
      />
    </>
  );
};

export default Inventories;
