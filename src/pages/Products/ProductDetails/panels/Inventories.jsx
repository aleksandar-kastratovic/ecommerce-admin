import { toast } from "react-toastify";
import useAPI from "../../../../api/api";

import formFields from "../forms/inventories.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";

const Inventories = ({ productId }) => {
  const api = useAPI();

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

  return (
    <>
      <ListPage
        apiUrl={`admin/product-items/inventories/${productId}`}
        editUrl={`admin/product-items/inventories`}
        title=" "
        columnFields={formFields}
        initialData={{ id_product: productId }}
        actionNewButton="modal"
        addFieldLabel="Dodajte novu cenu"
        showAddButton={true}
        customActions={customActions}
      />
    </>
  );
};

export default Inventories;
