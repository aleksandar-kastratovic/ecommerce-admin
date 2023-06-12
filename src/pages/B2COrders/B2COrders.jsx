import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const B2COrders = () => {

  const customActions = {
    edit: {
      type: "custom",
      display: false,
    },
  };

  return (
    <ListPage
      listPageId="B2COrders"
      apiUrl="admin/orders-b2c/list"
      title="Porudžbine"
      columnFields={tblFields}
      showNewButton={false}
      customActions={customActions}
    />
  );
};

export default B2COrders;
