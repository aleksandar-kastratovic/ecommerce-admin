import { useNavigate } from "react-router-dom";

import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const B2Cbanners = ({ }) => {
  const navigate = useNavigate();
  const buttons = [
    {
      label: "Pozicije",
      action: () => {
        navigate("positions");
      },
    },
  ];

  return (
    <ListPage
      title={"B2C baneri"}
      apiUrl="admin/banners-b2c/main"
      columnFields={tblFields}
      additionalButtons={buttons}
      actionNewButton="modal"
    />
  );
};

export default B2Cbanners;
