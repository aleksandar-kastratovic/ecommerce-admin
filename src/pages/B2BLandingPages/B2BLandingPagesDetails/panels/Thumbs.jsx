import formFields from "../forms/thumbs.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";
// import ModalContent from "../../ModalContent";
import { toast } from "react-toastify";
import { useContext } from "react";
import AuthContext from "../../../../store/auth-contex";

const Thumbs = ({ pageId }) => {

  const authCtx = useContext(AuthContext);
  const { api } = authCtx;

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

          api.delete(`admin/landing-pages-b2b/thumb/${rowData.id}`)
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
        apiUrl={`admin/landing-pages-b2b/thumb/${pageId}`}
        editUrl={`admin/landing-pages-b2b/thumb`}
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
