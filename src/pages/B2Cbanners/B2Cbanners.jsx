import { useNavigate } from "react-router-dom";

import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./mainListFields.json";

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
    />
  );
};

export default B2Cbanners;
