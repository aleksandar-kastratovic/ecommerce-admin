import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";

import formFields from "../forms/payments.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";

const Payments = ({ data, customerId }) => {

  const [formFieldsTemp, setFormFieldsTemp] = useState(formFields);
  const [type, setType] = useState('');
  const [dataPayments, setDataPayments] = useState(null)

  const api = useAPI();

  const customActions = {
    edit: {
      clickHandler: {
        type: 'modal_form',
        fnc: (rowData) => {
          api.get(`admin/customers-b2c/billing-address/${customerId}/${rowData.id}`)
            .then((response) => {
              setDataPayments(response?.payload);
              setType(response?.payload?.customer_type);
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

          api.delete(`admin/customers-b2c/billing-address/${rowData.id}`)
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

  const filterFormFields = (data, type) => {
    let arr = data.map((field) => {
      if (type === 'company') {
        if (field.prop_name === "pib" || field.prop_name === "maticni_broj" || field.prop_name === "company_name") {
          return {
            ...field,
            required: true
          };
        }

        if (field.company_display === true) {
          return {
            ...field,
            in_details: true
          };
        } else {
          return {
            ...field,
            in_details: false
          };
        }
      } else {
        if (field.personal_display === true) {
          return {
            ...field,
            in_details: true
          };
        } else {
          return {
            ...field,
            in_details: false
          };
        }
      }
    });
    setFormFieldsTemp([...arr]);
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
      case "customer_type":
        filterFormFields(formFields, ret.customer_type);
        return ret;
      case 'id_country':
        fetchPlacesFormFields(formFields, data?.id_country);
        return ret;
      default:
        return ret;
    }
  };

  useEffect(() => {
    if (type !== '') {
      filterFormFields(formFields, type);
    } else {
      filterFormFields(formFields, data?.customer_type);
    }
  }, [type]);

  useEffect(() => {
    if (dataPayments?.id_country) {
      fetchPlacesFormFields(formFields, dataPayments?.id_country);
    }
  }, [dataPayments])


  return (
    <>
      <ListPage
        validateData={validateData}
        listPageId="B2CPayments"
        apiUrl={`admin/customers-b2c/billing-address/${customerId}`}
        title=" "
        columnFields={formFieldsTemp}
        actionNewButton="modal"
        addFieldLabel="Dodajte novu vrednost"
        showAddButton={true}
        initialData={{ id_customer: customerId }}
        customActions={customActions}
        onNewButtonPress={() => { setType('') }}
        clearButton={type === '' ? true : false}
        selectableCountryTown={true}
        useColumnFields={true}
      />
    </>
  );
};

export default Payments;
