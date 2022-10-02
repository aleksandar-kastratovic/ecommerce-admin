import { useNavigate } from "react-router-dom";
import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./mainListFields.json";

const B2Bbanners = ({}) => {
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
      title={"B2B baneri"}
      apiUrl="admin/banners-b2b/main"
      columnFields={tblFields}
      additionalButtons={buttons}
    />
  );
};

export default B2Bbanners;
