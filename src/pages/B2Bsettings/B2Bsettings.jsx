import ListPage from "../../components/shared/ListPage/ListPage";
import fields from "./mainListFields.json";

const B2Bsettings = () => {
    return <ListPage apiUrl="admin/configuration-b2b/main" title="B2B podešavanja" columnFields={fields} previewColumn="module" />;
};

export default B2Bsettings;
