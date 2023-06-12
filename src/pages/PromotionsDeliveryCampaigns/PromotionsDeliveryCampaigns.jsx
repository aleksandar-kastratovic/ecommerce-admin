import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const PromotionsDeliveryCampaigns = () => {
  return <ListPage listPageId="PromotionsDeliveryCampaigns" apiUrl="admin/campaigns/product-catalog/list" deleteUrl="admin/campaigns/product-catalog/basic-data" title="Promocije za dostavu" columnFields={tblFields} showNewButton={true} />;
};

export default PromotionsDeliveryCampaigns;
