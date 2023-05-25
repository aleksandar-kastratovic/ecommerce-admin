import { useLocation } from "react-router-dom";
import ListPage from "../../components/shared/ListPage/ListPage";
import fields from "./mainListFields.json";

const B2Csettings = () => {

  const { pathname } = useLocation();

  const customActions = {
    edit: {
      clickHandler: {
        type: 'navigate',
        fnc: (rowData) => {
          return `${pathname}/${rowData.module}`;
        },
      },
    }
  };

  return (
    < ListPage
      apiUrl="admin/configuration-b2c/main"
      title="B2C podešavanja"
      columnFields={fields}
      previewColumn="module"
      showNewButton={false}
      customActions={customActions}
    />
  )
};

export default B2Csettings;
