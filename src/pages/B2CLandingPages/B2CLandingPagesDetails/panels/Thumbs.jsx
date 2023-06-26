import formFields from "../forms/thumbs.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";
import useAPI from "../../../../api/api";
// import ModalContent from "../../ModalContent";
import { toast } from "react-toastify";

const Thumbs = ({ pageId }) => {

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

          api.delete(`admin/landing-pages-b2c/thumb/${rowData.id}`)
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
        listPageId="B2CLandingPageThumbs"
        apiUrl={`admin/landing-pages-b2c/thumb/${pageId}`}
        editUrl={`admin/landing-pages-b2c/thumb`}
        title=" "
        columnFields={formFields}
        actionNewButton="modal"
        addFieldLabel="Dodajte novu vrednost"
        showAddButton={true}
        initialData={{ id_landing_page: pageId }}
        customActions={customActions}
      />
    </>
  );
};

export default Thumbs;
