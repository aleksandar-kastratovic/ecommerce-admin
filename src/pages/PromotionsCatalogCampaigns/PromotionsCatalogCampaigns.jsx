import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const PromotionsCatalogCampaigns = () => {
  return <ListPage listPageId="PromotionsCatalogCampaigns" apiUrl="admin/campaigns/product-catalog/list" deleteUrl="admin/campaigns/product-catalog/basic-data" title="Promocije proizvoda" columnFields={tblFields} showNewButton={true} />;
};

export default PromotionsCatalogCampaigns;
