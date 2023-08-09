import { useNavigate } from "react-router-dom";
import ListPage from "../../components/shared/ListPage/ListPage";
import IconList from "../../helpers/icons";

import tblFields from "./tblFields.json";

const PricesGroupsListPage = () => {
  const navigate = useNavigate();

  const additionalButtons = [
    {
      label: "Nazad",
      icon: IconList.arrowBack,
      action: () => navigate(-1),
    },
  ];

  return (
    <ListPage
      listPageId="PricesGroupsListPage"
      title="Cenovnik"
      apiUrl="admin/product-items/prices-structure"
      columnFields={tblFields}
      additionalButtons={additionalButtons}
      actionNewButton="modal"
    />
  );
};

export default PricesGroupsListPage;
