import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import ListPage from "../../components/shared/ListPage/ListPage";
import IconList from "../../helpers/icons";

import tblFields from "./tblFields.json";
import AuthContext from "../../store/auth-contex";
import ModalContent from "./ModalContent";
import { toast } from "react-toastify";

const ProductsPriceMarkets = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const { api } = authCtx;
  const [data, setData] = useState([]);

  const additionalButtons = [
    {
      label: "Nazad",
      icon: IconList.arrowBack,
      action: () => navigate(-2),
    },
  ];

  const customActions = {
    edit: {
      clickHandler: {
        type: 'modal_form',
        fnc: (rowData) => {
          api.get(`admin/product-items/prices-markets/${rowData.id}`)
            .then((response) => { setData(response?.payload) })
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
        fnc: (rowData, handleDeleteModalData) => {
          return {
            show: true,
            id: rowData.id,
            mutate: null,
            children: (
              <ModalContent />
            )
          };
        },
      },
      deleteClickHandler: {
        type: 'dialog_delete',
        fnc: (rowData) => {
          api.delete(`admin/product-items/prices-markets/${rowData.id}`)
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
  }

  return (
    <ListPage
      listPageId="ProductsPriceMarkets"
      title="Tržište"
      customActions={customActions}
      apiUrl="admin/product-items/prices-markets"
      columnFields={tblFields}
      additionalButtons={additionalButtons}
      actionNewButton="modal"
    />
  );
};

export default ProductsPriceMarkets;
