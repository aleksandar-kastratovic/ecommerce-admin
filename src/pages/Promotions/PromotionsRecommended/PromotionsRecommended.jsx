import ListPage from "../../../components/shared/ListPage/ListPage";
import tblFields from "./PromotionsRecommendedDetails/forms/basic_data.json";

const PromotionsRecommended = () => {

  return <ListPage listPageId="PromotionsRecommended" apiUrl="admin/campaigns/cart-delivery/list" deleteUrl="admin/campaigns/cart-delivery/list" title=" " columnFields={tblFields} showNewButton={true} />;
};

export default PromotionsRecommended;
