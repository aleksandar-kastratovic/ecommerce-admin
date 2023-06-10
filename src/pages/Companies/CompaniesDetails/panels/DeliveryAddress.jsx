import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import formFields from "../forms/delivery_address.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";

const DeliveryAdresss = ({ companyId }) => {

  const api = useAPI();

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

  // const findField = (fieldName) => {
  //   return formFields.find((field) => field.prop_name === fieldName);
  // };

  // const idCountryField = findField("id_country");
  // if (idCountryField) {
  //   console.log("Polje id_country je pronađeno!");

  //   if (idCountryField.fillFromApi === "admin/customers-b2b/delivery-address/ddl") {
  //     console.log("Polje id_country ima fillFromApi postavljeno na 'admin/customers-b2b/delivery-address/ddl'");
  //     const townField = findField("id_town");
  //     if (townField) {
  //       console.log("Polje town je pronađeno!");
  //       console.log(townField);
  //     }
  //   }
  // }


  return (
    <>
      <ListPage
        apiUrl={`admin/customers-b2b/delivery-address/${companyId}`}
        editUrl={`admin/customers-b2b/delivery-address`}
        title=" "
        columnFields={formFields}
        actionNewButton="modal"
        initialData={{ id_company: companyId }}
        addFieldLabel="Dodajte adresu dostave"
        showAddButton={true}
        customActions={customActions}
      />
    </>
  );
}

export default DeliveryAdresss;
