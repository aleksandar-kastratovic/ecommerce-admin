import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const Notifications = () => {
  // fali mi id_compnay kao prop
  // const api = useAPI();

  // let newFields = deepClone(formFields);

  // let currencyField = newFields.find((item) => item.prop_name === "id_company_user")
  // if (currencyField == undefined) {
  //   console.warn("Polje currency nije pronadjeno!");
  //   return;
  // }

  // const queryString = `id_group=${groupId}`;

  // currencyField.queryString = queryString

  return (
    <ListPage
      listPageId="Notifications"
      apiUrl="admin/notifications-b2b"
      editUrl="admin/notifications-b2b"
      title="Notifikacije"
      columnFields={tblFields}
      actionNewButton="modal"
    // editUrlQueryString={[
    //   {
    //     field: "id_company",
    //     value: groupId
    //   }
    // ]}
    />
  );
};

export default Notifications;
