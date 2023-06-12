import { useNavigate } from "react-router-dom";

import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const B2Bbanners = ({ }) => {
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
      listPageId="B2Bbanners"
      title={"B2B baneri"}
      apiUrl="admin/banners-b2b/main"
      columnFields={tblFields}
      actionNewButton="modal"
      additionalButtons={buttons}
    />
  );
};

export default B2Bbanners;
