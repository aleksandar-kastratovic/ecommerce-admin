import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";

import formFields from "../forms/delivery.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";

const Payments = ({ data, customerId }) => {

  const [dataPayments, setDataPayments] = useState(data);

  const api = useAPI();

  const customActions = {
    // edit: {
    //   clickHandler: {
    //     type: 'modal_form',
    //     fnc: (rowData) => {
    //       api.get(`admin/customers-b2c/billing-address/${customerId}/${rowData.id}`)
    //         .then((response) => console.log(response))
    //         .catch((error) => console.log(error));
    //       return {
    //         show: true,
    //         id: rowData.id
    //       };
    //     },
    //   },
    // },
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

          api.delete(`admin/customers-b2c/shipping-address/${rowData.id}`)
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


  return (
    <>
      <ListPage
        listPageId="B2CDelivery"
        apiUrl={`admin/customers-b2c/shipping-address/${customerId}`}
        editUrl={`admin/customers-b2c/shipping-address`}
        title=" "
        columnFields={formFields}
        actionNewButton="modal"
        addFieldLabel="Dodajte novu vrednost"
        showAddButton={true}
        initialData={{ id_customer: customerId }}
        customActions={customActions}
      />
    </>
  );
};

export default Payments;
