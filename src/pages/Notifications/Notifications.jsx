import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const Notifications = () => {
  return (
    <ListPage apiUrl="admin/notifications" title="Notifikacije" columnFields={tblFields} />
  );
};

export default Notifications;
