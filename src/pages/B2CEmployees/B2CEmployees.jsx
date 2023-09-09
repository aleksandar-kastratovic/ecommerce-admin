import { useNavigate } from "react-router-dom";
import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";
import { toast } from "react-toastify";
import { useContext } from "react";
import AuthContext from "../../store/auth-contex";


const B2CEmployees = () => {

  const authCtx = useContext(AuthContext);
  const { api } = authCtx;
  const navigate = useNavigate();

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

          api.delete(`admin/employees-b2c/list/${rowData.id}`)
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

  let buttons = [
    {
      id: 1,
      label: "Radne jedinice",
      action: () => {
        navigate("/b2c-working-unit");
      },
    },
  ];

  return (
    <ListPage
      listPageId="B2CEmployees"
      apiUrl="admin/employees-b2c/list"
      editUrl="admin/employees-b2c/basic-data"
      title="Zaposleni"
      actionNewButton="modal"
      columnFields={tblFields}
      additionalButtons={buttons}
      customActions={customActions}
    />
  );
};

export default B2CEmployees;
