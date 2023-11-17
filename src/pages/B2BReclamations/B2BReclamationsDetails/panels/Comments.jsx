import { useEffect, useState } from "react";
import ListPage from "../../../../components/shared/ListPage/ListPage";
import tblFields from "../forms/comments.json";
import { useContext } from "react";
import AuthContext from "../../../../store/auth-contex";

const Comments = ({ rId }) => {

  const authCtx = useContext(AuthContext);
  const { api } = authCtx;
  const [tblFieldsTemp, setTblFieldsTemp] = useState(tblFields);
  const [idReclamationItem, setIdReclamationItem] = useState(null);
  const [selectedFile, setSelectedFile] = useState([]);

  const base64 = selectedFile.map(item => { return item?.base_64 })

  console.log("base64", base64)

  const customActions = {
    edit: {
      type: "edit",
      title: "Pregledaj",
      icon: "preview",
      clickHandler: {
        type: 'modal_form',
        fnc: (rowData) => {
          let arr = tblFields.map((item) => {
            return {
              ...item,
              disabled: true
            }
          })
          setTblFieldsTemp([...arr]);
          return {
            show: true,
            id: rowData.id
          };
        },
      },
    },
    delete: {
      type: "delete",
      display: false,
    },
  }


  const fetchPlacesFormFields = async (tblFields, id_reclamations_items) => {
    let index = tblFields.findIndex((it) => { return it.prop_name === 'id_reclamations_items' });

    const recObject = tblFields[index];
    let path = `${recObject.fillFromApi}`;
    if (recObject?.usePropName) {
      path = `${recObject.fillFromApi}/${recObject.prop_name}?id_reclamations=${id_reclamations_items}`;
    }

    await api
      .get(path)
      .then((response) => {
        let res = response?.payload;
        let arr = tblFields.map((item) => {
          if (item.prop_name === 'id_reclamations_items') {
            return {
              ...item,
              queryString: `id_reclamations=${id_reclamations_items}`,
            }
          } else {
            return {
              ...item
            }
          }
        });
        setTblFieldsTemp([...arr]);
      })
      .catch((error) => {
        console.warn(error);
      });
  }


  const validateData = (data, field) => {
    let ret = data;
    switch (field) {
      case 'id_reclamations_items':
        setIdReclamationItem(data.id_reclamations_items)
        return ret;
      default:
        return ret;
    }
  };

  useEffect(() => {
    fetchPlacesFormFields(tblFields, rId);
  }, [])

  return (
    <>
      <ListPage
        listPageId="B2BReclamationsComments"
        apiUrl={`admin/reclamations-b2b/comments/${rId}`}
        editUrl={`admin/reclamations-b2b/comments`}
        title=" "
        columnFields={tblFieldsTemp}
        useColumnFields={true}
        actionNewButton="modal"
        initialData={{ id_reclamations: rId, id_reclamations_items: idReclamationItem, file: base64 }}
        customActions={customActions}
        showAddButton={true}
        addFieldLabel="Dodajte novi komentar"
        onNewButtonPress={() => {
          fetchPlacesFormFields(tblFields, rId);
        }}
        validateData={validateData}
        onFilePicked={
          (fileObject) => {

            setSelectedFile([...selectedFile, fileObject]);
          }
        }
        selectedFile={selectedFile}
      />
    </>
  )
}

export default Comments
