
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import formFields from "../forms/document.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";
import AuthContext from "../../../../store/auth-contex";


const Document = ({ productId }) => {

  const authCtx = useContext(AuthContext);
  const { api } = authCtx;
  const [file, setFile] = useState(null);

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

          api.delete(`admin/product-items/documents/list/${rowData.id}`)
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
    edit: {
      clickHandler: {
        type: 'modal_form',
        fnc: (rowData) => {

          api.get(`admin/product-items/documents/basic-data/${rowData.id}`)
            .then((response) => {
              setFile({
                name: response?.payload?.file_filename,
                base_64: response?.payload?.file_base64
              })
            })
            .catch((error) => console.log(error));
          return {
            show: true,
            id: rowData.id
          };
        },
      },
    },
  };

  return (
    <>
      <ListPage
        listPageId="Documents"
        apiUrl={`admin/product-items/documents/list/${productId}`}
        editUrl={`admin/product-items/documents/basic-data`}
        title=" "
        columnFields={formFields}
        actionNewButton="modal"
        initialData={{ id_product: productId, file_base64: file?.base_64 }}
        addFieldLabel="Dodajte novi dokument"
        showAddButton={true}
        customActions={customActions}
        onFilePicked={setFile}
        selectedFile={file}
        onNewButtonPress={() => { setFile(null) }}
      />
    </>
  );
}

export default Document;
