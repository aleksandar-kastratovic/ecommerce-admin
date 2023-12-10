
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import formFields from "../forms/document.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";
import AuthContext from "../../../../store/auth-contex";

const Document = ({ productId }) => {

  const authCtx = useContext(AuthContext);
  const { api } = authCtx;
  const [file, setFile] = useState(null);

  const [formFieldsTemp, setFormFieldsTemp] = useState(formFields);

  const handleInformationImage = () => {
    api.get(`admin/product-items/documents/basic-data/options/upload`)
      .then((response) => {
        formatFormFields(response?.payload);
      })
      .catch((error) => console.warn(error));
  };

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
    downloadFile: {
      type: "custom",
      display: true,
      position: 2,
      icon: "download",
      title: "Preuzmite dokument",
      clickHandler: {
        type: '',
        fnc: (rowData) => {
          const fileId = rowData?.file;
          window.open(`${fileId}`, "_blank");
        },
      },
    },
    copyFile: {
      type: "custom",
      display: true,
      position: 3,
      icon: "content_copy",
      title: "Kopirajte putanju fajla",
      clickHandler: {
        type: '',
        fnc: (rowData) => {
          const filePath = rowData?.file;
          navigator.clipboard.writeText(filePath)
            .then(() => {
              toast.success("Putanja fajla je kopirana.");
            })
            .catch((error) => {
              toast.error("Došlo je do greške pri kopiranju putanje fajla.");
            });
        },
      },
    },
  };

  const formatFormFields = (data) => {
    if (data) {
      const { allow_size, allow_format } = data;
      const descripiton = `Veličina fajla ne sme biti veća od ${allow_size / (1024 * 1024).toFixed(2)}MB. Dozvoljeni formati fajla: ${allow_format.map((format) => format.name).join(", ")}`;
      let arr = formFields.map((field) => {
        if (field?.prop_name === 'thumb_image_base64') {
          return {
            ...field,
            description: descripiton,
            validate: {
              imageUpload: data
            }
          };
        } else {
          return {
            ...field
          }
        }
      });
      setFormFieldsTemp([...arr]);
    }
  }

  useEffect(() => {
    handleInformationImage();
  }, [])

  return (
    <>
      <ListPage
        listPageId="Documents"
        apiUrl={`admin/product-items/documents/list/${productId}`}
        editUrl={`admin/product-items/documents/basic-data`}
        title=" "
        columnFields={formFieldsTemp}
        useColumnFields={true}
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
