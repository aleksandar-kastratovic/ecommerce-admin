import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ListPage from "../../components/shared/ListPage/ListPage";
import columnFields from "./tblFields.json";
import useAPI from "../../api/api";
import ModalContent from "./ModalContent";


const ProductSpecsGroups = () => {

  const api = useAPI();
  const { pathname } = useLocation();

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
              <ModalContent apiPath={`admin/product-item-specifications/group/message/${rowData.id}`} rowData={rowData} handleDeleteModalData={handleDeleteModalData} />
            )
          };
        },
      },
      deleteClickHandler: {
        type: 'dialog_delete',
        fnc: (rowData, deleteModalData) => {

          api.delete(`admin/product-item-specifications/group/confirm/${rowData.id}`)
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
    queuePlayNext: {
      type: "custom",
      display: true,
      position: 2,
      clickHandler: {
        type: 'navigate',
        fnc: (rowData,) => {
          return `${pathname}/${rowData.id}`;
        },
      },
      icon: "queue_play_next",
      title: "Atributi i njene vrednosti",
    }
  };

  return (
    <ListPage
      apiUrl="admin/product-item-specifications/group"
      title="Specifikacije"
      columnFields={columnFields}
      showNewButton={true}
      actionNewButton="modal"
      customActions={customActions}
    />
  );
};

export default ProductSpecsGroups;
