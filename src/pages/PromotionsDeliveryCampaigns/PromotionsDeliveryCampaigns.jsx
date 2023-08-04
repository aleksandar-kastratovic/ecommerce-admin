import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./PromotionsDeliveryCampaignsDetails/forms/basic_data.json";

const PromotionsDeliveryCampaigns = () => {

  return <ListPage listPageId="PromotionsDeliveryCampaigns" apiUrl="admin/campaigns/cart-delivery/list" deleteUrl="admin/campaigns/cart-delivery/list" title="Promocije za dostavu" columnFields={tblFields} showNewButton={true} />;
};

export default PromotionsDeliveryCampaigns;
