import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const Notifications = () => {
  // const api = useAPI();

  // let newFields = deepClone(formFields);

  // let currencyField = newFields.find((item) => item.prop_name === "id_group_attribute")
  // if (currencyField == undefined) {
  //   console.warn("Polje currency nije pronadjeno!");
  //   return;
  // }

  // const queryString = `id_group=${groupId}`;

  // currencyField.queryString = queryString

  return (
    <ListPage
      apiUrl="admin/notifications"
      editUrl="admin/notifications"
      title="Notifikacije"
      columnFields={tblFields}
      actionNewButton="modal"
    // editUrlQueryString={[
    //   {
    //     field: "id_group",
    //     value: groupId
    //   }
    // ]}
    />
  );
};

export default Notifications;
