import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";

import formFields from "../forms/payments.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";

const Payments = ({ data, customerId }) => {

  const [formFieldsTemp, setFormFieldsTemp] = useState(formFields);
  const [type, setType] = useState('');

  const api = useAPI();

  const customActions = {
    edit: {
      clickHandler: {
        type: 'modal_form',
        fnc: (rowData) => {
          api.get(`admin/customers-b2c/billing-address/${customerId}/${rowData.id}`)
            .then((response) => {
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
      console.log(field)
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


  const validateData = (data, field) => {
    let ret = data;
    switch (field) {
      case "customer_type":
        filterFormFields(formFields, ret.customer_type);
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
        typePage='placanja'
        onNewButtonPress={() => { setType('') }}
        clearButton={type === '' ? true : false}
      />
    </>
  );
};

export default Payments;
