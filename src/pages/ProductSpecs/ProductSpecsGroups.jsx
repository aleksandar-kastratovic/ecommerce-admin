import { useLocation, useNavigate } from "react-router-dom";
import ListPage from "../../components/shared/ListPage/ListPage";
import columnFields from "./tblFields.json";

const ProductSpecsGroups = () => {

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const customActions = { type1: { handler: (rowData) => { navigate(`${pathname}/${rowData.id}`) }, icon: "attribution" } };

  return (
    <ListPage
      apiUrl="admin/product-item-specifications/group"
      title="Specifikacije"
      columnFields={columnFields}
      showNewButton={true}
      actionNewButton="modal"
      customActions={customActions}
    />
  );
};

export default ProductSpecsGroups;
