import ListPage from "../../../components/shared/ListPage/ListPage";
import tblFields from "./PromotionsCrossSellsDetails/forms/basic_data.json";

const PromotionsCrossSells = () => {

  return <ListPage listPageId="PromotionsCrossSells" apiUrl="admin/campaigns/cart-delivery/list" deleteUrl="admin/campaigns/cart-delivery/list" title=" " columnFields={tblFields} showNewButton={true} />;
};

export default PromotionsCrossSells;
