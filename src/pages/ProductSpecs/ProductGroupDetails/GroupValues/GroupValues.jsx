import formFields from "./formFields.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";
import { deepClone } from "@mui/x-data-grid/utils/utils";
import useAPI from "../../../../api/api";
import { toast } from "react-toastify";
import ModalContent from "../../ModalContent";

const GroupValues = ({ groupId }) => {

  const api = useAPI();

  let newFields = deepClone(formFields);

  let currencyField = newFields.find((item) => item.prop_name === "id_group_attribute")
  if (currencyField == undefined) {
    console.warn("Polje currency nije pronadjeno!");
    return;
  }

  const queryString = `id_group=${groupId}`;

  currencyField.queryString = queryString

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
              <ModalContent apiPath={`admin/product-item-specifications/group-attribute-values/message/${rowData.id}`} rowData={rowData} handleDeleteModalData={handleDeleteModalData} />
            )
          };
        },
      },
      deleteClickHandler: {
        type: 'dialog_delete',
        fnc: (rowData, deleteModalData) => {

          api.delete(`admin/product-item-specifications/group-attribute-values/confirm/${rowData.id}?delete_product_attributes=${deleteModalData.delete_product_attributes}`)
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
        key="group-attribute-values"
        apiUrl={`admin/product-item-specifications/group-attribute-values/${groupId}`}
        editUrl={`admin/product-item-specifications/group-attribute-values`}
        title=""
        columnFields={newFields}
        actionNewButton="modal"
        addFieldLabel="Dodajte novu vrednost"
        showAddButton={true}
        initialData={{ id_group: groupId }}
        customActions={customActions}
      />
    </>
  );
};

export default GroupValues;
