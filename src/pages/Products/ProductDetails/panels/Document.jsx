
import { toast } from "react-toastify";
import useAPI from "../../../../api/api";
import formFields from "../forms/document.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";

const Prices = ({ productId }) => {

  const api = useAPI();

  // const customActions = {
  //   delete: {
  //     clickHandler: {
  //       type: 'dialog_delete',
  //       fnc: (rowData) => {
  //         return {
  //           show: true,
  //           id: rowData.id,
  //           mutate: null,
  //         };
  //       },
  //     },
  //     deleteClickHandler: {
  //       type: 'dialog_delete',
  //       fnc: (rowData) => {

  //         api.delete(`admin/product-items/prices/${rowData.id}`)
  //           .then(() => toast.success("Zapis je uspešno obrisan"))
  //           .catch(() => toast.warning("Došlo je do greške prilikom brisanja"));

  //         return {
  //           show: false,
  //           id: rowData.id,
  //           mutate: 1,
  //         };
  //       }
  //     },
  //   },
  // };

  return (
    <>
      <ListPage
        listPageId="Documents"
        apiUrl={`admin/product-items/prices/${productId}`}
        editUrl={`admin/product-items/prices`}
        title=" "
        columnFields={formFields}
        actionNewButton="modal"
        initialData={{ id_product: productId }}
        addFieldLabel="Dodajte novi dokument"
        showAddButton={true}
      // customActions={customActions}
      />
    </>
  );
}

export default Prices;
