
import { useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import formFields from "../forms/document.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";


const Document = ({ productId }) => {

  const api = useAPI();
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
              console.log("reeeeeee", response)
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
        initialData={{ id_product: productId }}
        addFieldLabel="Dodajte novi dokument"
        showAddButton={true}
        customActions={customActions}
        allowedFileTypes={["jpg"]}
        onFilePicked={setFile}
        selectedFile={file}
      />
    </>
  );
}

export default Document;
