import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const PromotionsCatalogCampaigns = () => {
    return <ListPage apiUrl="admin/product-item-specifications/set" title="Kampanje kataloga" columnFields={tblFields} showNewButton={true} />;
};

export default PromotionsCatalogCampaigns;
