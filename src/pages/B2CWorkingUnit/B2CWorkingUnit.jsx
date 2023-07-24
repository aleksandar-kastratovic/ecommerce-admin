import { useNavigate } from "react-router-dom";
import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";
import useAPI from "../../api/api";
import { toast } from "react-toastify";
import ModalContent from "./ModalContent";

const B2CWorkingUnit = () => {

  const api = useAPI();
  const navigate = useNavigate();

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
              <ModalContent apiPath={`admin/working-units-b2c/list/message/${rowData.id}`} rowData={rowData} handleDeleteModalData={handleDeleteModalData} />
            )
          };
        },
      },
      deleteClickHandler: {
        type: 'dialog_delete',
        fnc: (rowData, deleteModalData) => {
          api.delete(`admin/working-units-b2c/list/confirm/${rowData.id}`)
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

  let buttons = [
    {
      id: 1,
      label: "Zaposleni",
      action: () => {
        navigate("/b2c-employees");
      },
    },
  ];

  return (
    <ListPage
      listPageId="B2CWorkingUnit"
      apiUrl="admin/working-units-b2c/list"
      editUrl="admin/working-units-b2c/basic-data"
      title="Radne jedinice"
      actionNewButton="modal"
      columnFields={tblFields}
      additionalButtons={buttons}
      customActions={customActions}
    />
  );
};

export default B2CWorkingUnit;
