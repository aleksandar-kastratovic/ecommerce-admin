import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import formFields from "../forms/prices.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";

const Prices = ({ productId }) => {

  const navigate = useNavigate();
  const api = useAPI();

  const additionalButtons = [
    {
      label: "Cenovnik",
      action: () => {
        navigate("/products/prices-groups");
      },
    },
  ];

  const validateData = (data, field) => {
    let ret = data;
    switch (field) {
      case "price_single_with_out_vat":
      case "price_vat_procent":
      case "price_quantity":
        ret.price_with_out_vat = Math.round(ret.price_quantity * ret.price_single_with_out_vat * 100) / 100;
        ret.price_with_vat = Math.round((ret.price_vat_procent / 100 + 1) * ret.price_with_out_vat * 100) / 100;
        return ret;
      case "price_with_out_vat":
        ret.price_with_vat = Math.round((ret.price_vat_procent / 100 + 1) * ret.price_with_out_vat * 100) / 100;
        ret.price_single_with_out_vat = Math.round((ret.price_with_out_vat / ret.price_quantity) * 100) / 100;
        return ret;
      case "price_with_vat":
        ret.price_with_out_vat = Math.round((ret.price_with_vat / (ret.price_vat_procent / 100 + 1)) * 100) / 100;
        ret.price_single_with_out_vat = Math.round((ret.price_with_out_vat / ret.price_quantity) * 100) / 100;
        return ret;
      default:
        return ret;
    }
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

          api.delete(`admin/product-items/prices/${rowData.id}`)
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
        listPageId="Prices"
        apiUrl={`admin/product-items/prices/${productId}`}
        editUrl={`admin/product-items/prices`}
        title=" "
        columnFields={formFields}
        actionNewButton="modal"
        initialData={{ id_product: productId }}
        addFieldLabel="Dodajte novu cenu"
        showAddButton={true}
        additionalButtons={additionalButtons}
        customActions={customActions}
        validateData={validateData}
      />
    </>
  );
}

export default Prices;
