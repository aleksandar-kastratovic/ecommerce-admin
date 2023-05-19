import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const PromotionsCatalogCampaigns = () => {
  return <ListPage apiUrl="admin/campaigns/product-catalog/list" deleteUrl="admin/campaigns/product-catalog/basic-data" title="Kampanje za stavke u korpi" columnFields={tblFields} showNewButton={true} />;
};

export default PromotionsCatalogCampaigns;
