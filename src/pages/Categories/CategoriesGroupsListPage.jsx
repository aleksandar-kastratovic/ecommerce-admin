import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const CategoriesGroupsListPage = () => {
    return <ListPage apiUrl="admin/category_product/groups" title="Grupe kategorija" columnFields={tblFields} />;
};

export default CategoriesGroupsListPage;
