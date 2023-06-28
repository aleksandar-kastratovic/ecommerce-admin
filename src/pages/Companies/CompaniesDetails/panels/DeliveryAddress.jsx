import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import formFields from "../forms/delivery_address.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";


const DeliveryAdresss = ({ companyId, data }) => {

  const api = useAPI();
  const [formFieldsTemp, setFormFieldsTemp] = useState(formFields);

  const [dataDeliveryAdress, setDataDeliveryAdress] = useState(null);
  const customActions = {
    edit: {
      clickHandler: {
        type: 'modal_form',
        fnc: (rowData) => {
          api.get(`admin/customers-b2b/delivery-address/${rowData.id}`)
            .then((response) => {
              setDataDeliveryAdress(response?.payload);
            })
            .catch((error) => console.log(error));
          return {
            show: true,
            id: rowData.id
          };
        },
      },
    },
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

          api.delete(`admin/customers-b2b/delivery-address/${rowData.id}`)
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
        console.log("Res of id_country:", res);
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
    if (dataDeliveryAdress?.id_country) {
      fetchPlacesFormFields(formFields, dataDeliveryAdress?.id_country);
    }
  }, [dataDeliveryAdress])


  return (
    <>
      <ListPage
        validateData={validateData}
        listPageId="DeliveryAdresss"
        apiUrl={`admin/customers-b2b/delivery-address/${companyId}`}
        editUrl={`admin/customers-b2b/delivery-address`}
        title=" "
        columnFields={formFieldsTemp}
        actionNewButton="modal"
        initialData={{ id_company: companyId }}
        addFieldLabel="Dodajte adresu dostave"
        showAddButton={true}
        customActions={customActions}
        useColumnFields={true}
        selectableCountryTown={true}
      />
    </>
  );
}

export default DeliveryAdresss;
