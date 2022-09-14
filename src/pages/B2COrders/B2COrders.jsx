import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const B2COrders = () => {
  
  return (
    <ListPage apiUrl="admin/orders_b2c/order" title="Narudžbenice" columnFields={tblFields} showNewButton={false}/>
  );
};

export default B2COrders;
