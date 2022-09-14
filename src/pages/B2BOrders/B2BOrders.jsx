import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const B2BOrders = () => {
  
  return (
    <ListPage apiUrl="admin/orders_b2b/order" title="Narudžbenice" columnFields={tblFields} showNewButton={false}/>
  );
};

export default B2BOrders;
