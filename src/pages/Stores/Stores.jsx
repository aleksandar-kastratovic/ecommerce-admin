import { useState } from "react";
import useAPI from "../../api/api";
import ListPage from "../../components/shared/ListPage/ListPage";
import formFields from "./tblFields.json";

const Stores = () => {

  const api = useAPI();
  const [formFieldsTemp, setFormFieldsTemp] = useState(formFields);

  const fetchPlacesFormFields = async (formFields, id_country) => {
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

  return (
    <ListPage
      validateData={validateData}
      listPageId="Stores"
      apiUrl="admin/stores"
      title="Skladišta"
      columnFields={formFieldsTemp}
      actionNewButton="modal"
      useColumnFields={true}
      selectableCountryTown={true}
    />
  );
};

export default Stores;
