import { useLocation, useNavigate } from "react-router";
import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const CategoriesGroupsListPage = () => {

  const { pathname } = useLocation();

  const customActions = {
    list: {
      type: "custom",
      display: true,
      position: 2,
      clickHandler: {
        type: 'navigate',
        fnc: (rowData) => {
          return `${pathname}/category/${rowData.id}`;
        },
      },
      icon: "list",
      // title: "Kategorije",
    },
    accountTree: {
      type: "custom",
      display: true,
      position: 3,
      clickHandler: {
        type: 'navigate',
        fnc: (rowData) => {
          return `${pathname}/tree/${rowData.id}`;
        },
      },
      icon: "account_tree",
      title: "Kategorije",
    }
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
