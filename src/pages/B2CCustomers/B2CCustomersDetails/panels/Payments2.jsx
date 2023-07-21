import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";

import formFields from "../forms/payments.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";

const Payments = ({ data, customerId }) => {

  const [formFieldsTemp, setFormFieldsTemp] = useState(formFields);
  const [type, setType] = useState('');
  const [dataPayments, setDataPayments] = useState(null);
  const [hasPlaces, setHasPlaces] = useState(false);

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



  const validateData = (data, field) => {
    let ret = data;
    switch (field) {
      case "customer_type":
        // filterFormFields(formFields, ret.customer_type);
        return ret;
      case 'id_country':
        // fetchPlacesFormFields(formFields, data?.id_country);
        return ret;
      default:
        return ret;
    }
  };

  useEffect(() => {

  }, [type]);

  useEffect(() => {
    if (dataPayments?.id_country) {
      // fetchPlacesFormFields(formFields, dataPayments?.id_country);
    }
  }, [dataPayments]);


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
        onModalInitDataChange={(data, type) => { }}
      />
    </>
  );
};

export default Payments;
