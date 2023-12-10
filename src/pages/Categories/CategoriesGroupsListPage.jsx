import { useLocation } from "react-router";
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
      title: "Lista kategorija",
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
      title: "Drvo kategorija",
    }
  };



  return (
    <ListPage
      listPageId="CategoriesGroupsListPage"
      apiUrl="admin/category-product/groups"
      actionNewButton="modal"
      title="Grupe kategorija"
      columnFields={tblFields}
      customActions={customActions}
    />
  );
};

export default CategoriesGroupsListPage;
