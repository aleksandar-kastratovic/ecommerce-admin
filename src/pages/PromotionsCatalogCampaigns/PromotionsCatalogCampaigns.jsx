import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./PromotionsCatalogCampaignsPageDetails/forms/basic_data.json";

const PromotionsCatalogCampaigns = () => {
  return <ListPage listPageId="PromotionsCatalogCampaigns" apiUrl="admin/campaigns/product-catalog/list" deleteUrl="admin/campaigns/product-catalog/list" title="Promocije za proizvode" columnFields={tblFields} showNewButton={true} />;
};

export default PromotionsCatalogCampaigns;
