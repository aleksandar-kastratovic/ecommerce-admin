import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFelds.json";
const Companies = () => {
    return <ListPage apiUrl="admin/customers-b2b/basic-data" title="Kompanije" columnFields={tblFields} />;
};

export default Companies;
