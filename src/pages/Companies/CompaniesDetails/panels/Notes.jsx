import { toast } from "react-toastify";
import ListPage from "../../../../components/shared/ListPage/ListPage";
import formFields from "../forms/notes.json";
import useAPI from "../../../../api/api";

const Notes = ({ companyId }) => {
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

          api.delete(`admin/customers-b2b/notes/${rowData.id}`)
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
    <ListPage
      apiUrl={`admin/customers-b2b/notes/${companyId}`}
      editUrl={`admin/customers-b2b/notes`}
      columnFields={formFields}
      actionNewButton="modal"
      addFieldLabel="Dodajte napomenu"
      showAddButton={true}
      title=" "
      initialData={{ id_company: companyId }}
      customActions={customActions}
    />
  );
}

export default Notes;