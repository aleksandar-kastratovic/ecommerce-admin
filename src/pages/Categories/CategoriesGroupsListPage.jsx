import { useLocation, useNavigate } from "react-router";
import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const CategoriesGroupsListPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const customActions = {
    type1: { handler: (rowData) => { navigate(`${pathname}/tree/${rowData.id}`) }, icon: "account_tree" },
    type2: { handler: (rowData) => { navigate(`${pathname}/category/${rowData.id}`) }, icon: "list" }
  };

  return (
    <ListPage
      apiUrl="admin/category-product/groups"
      title="Grupe kategorija"
      columnFields={tblFields}
      customActions={customActions}
    />
  );
};

export default CategoriesGroupsListPage;
