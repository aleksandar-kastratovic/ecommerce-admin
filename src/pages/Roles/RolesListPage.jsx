import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const RolesListPage = () => {
    return <ListPage apiUrl="admin/roles/main" title="Uloge" columnFields={tblFields} />;
};

export default RolesListPage;
