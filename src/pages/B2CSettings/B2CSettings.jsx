import ListPage from "../../components/shared/ListPage/ListPage";
import fields from "./mainListFields.json";

const B2Csettings = () => {
    return <ListPage apiUrl="admin/configuration-b2c/main" title="B2C podešavanja" columnFields={fields} previewColumn="module" showNewButton={false} />;
};

export default B2Csettings;
