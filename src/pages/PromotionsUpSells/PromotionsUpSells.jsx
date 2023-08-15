import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./PromotionsUpSellsDetails/forms/basic_data.json";

const PromotionsUpSells = () => {

  return <ListPage listPageId="PromotionsUpSells" apiUrl="admin/campaigns/cart-delivery/list" deleteUrl="admin/campaigns/cart-delivery/list" title="Up-sells proizvodi" columnFields={tblFields} showNewButton={true} />;
};

export default PromotionsUpSells;
