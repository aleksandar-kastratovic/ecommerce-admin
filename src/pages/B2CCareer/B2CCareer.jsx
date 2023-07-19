import { useEffect, useState } from "react";
import ListPage from "../../components/shared/ListPage/ListPage";

import formFields from "./tblFields.json";
import useAPI from "../../api/api";

const B2CCareer = () => {

  const api = useAPI();

  const [formFieldsTemp, setFormFieldsTemp] = useState(formFields);
  const [dataCareer, setDataCareer] = useState(null);

  const customActions = {
    edit: {
      clickHandler: {
        type: 'modal_form',
        fnc: (rowData) => {
          console.log("rowData", rowData)
          api.get(`admin/career-b2c/${rowData.id}`)
            .then((response) => {
              setDataCareer(response?.payload);
            })
            .catch((error) => console.log(error));
          return {
            show: true,
            id: rowData.id
          };
        },
      },
    },
  }


  const fetchPlacesFormFields = async (formFields, id_country) => {
    console.log("fetchPlacesFormFields", formFields)
    let index = formFields.findIndex((it) => { return it.prop_name === 'id_town' });
    const townObject = formFields[index];
    let path = `${townObject.fillFromApi}?id_country=${id_country}`;
    if (townObject?.usePropName) {
      path = `${townObject.fillFromApi}/${townObject.prop_name}?id_country=${id_country}`;
    }
    await api
      .get(path)
      .then((response) => {
        let res = response?.payload;
        console.log("res", res)
        let arr = formFields.map((item, i) => {
          if (item.prop_name === 'id_town') {
            if (res.length > 0) {
              return {
                ...item,
                queryString: `id_country=${id_country}`,
                in_details: true
              }
            } else {
              return {
                ...item,
                in_details: false
              }
            }
          } else {
            if (item.prop_name === 'town_name') {
              if (res.length > 0) {
                return {
                  ...item,
                  in_details: false
                }
              } else {
                return {
                  ...item,
                  in_details: true
                }
              }
            }
            return {
              ...item
            }
          }
        });
        setFormFieldsTemp([...arr]);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  const validateData = (data, field) => {
    let ret = data;
    switch (field) {
      case 'id_country':
        fetchPlacesFormFields(formFields, data?.id_country);
        return ret;
      default:
        return ret;
    }
  };

  useEffect(() => {
    if (dataCareer?.id_country) {
      fetchPlacesFormFields(formFields, dataCareer?.id_country);
    }
  }, [dataCareer])

  return (
    <ListPage
      listPageId="B2CCareer"
      apiUrl="admin/career-b2c/list"
      editUrl="admin/career-b2c/basic-data"
      deleteUrl="admin/career-b2c/list"
      validateData={validateData}
      customActions={customActions}
      title="Karijera"
      columnFields={formFieldsTemp}
      actionNewButton="modal"
      selectableCountryTown={true}
      useColumnFields={true}
    />
  );
};

export default B2CCareer;
