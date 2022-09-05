import { useNavigate } from "react-router-dom";
import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";
const B2CbannersPositions = () => {
  const navigate = useNavigate();
  const buttons = [
    {
      label: "Baneri",
      action: () => {
        navigate(-1);
      },
    },
  ];

  return (
    <ListPage
      title="Pozicije B2C banera"
      apiUrl="admin/banners-b2c/positions"
      columnFields={tblFields}
      additionalButtons={buttons}
    />
  );
};

export default B2CbannersPositions;
