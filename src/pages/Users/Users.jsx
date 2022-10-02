import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const Users = () => {
    return <ListPage apiUrl="admin/users" title="Korisnici" columnFields={tblFields} />;
};

export default Users;
