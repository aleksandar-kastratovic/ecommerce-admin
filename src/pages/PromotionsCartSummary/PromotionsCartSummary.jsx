import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";

const PromotionsCartSummary = () => {
  return <ListPage listPageId="PromotionsCartSummary" apiUrl="admin/campaigns/product-catalog/list" deleteUrl="admin/campaigns/product-catalog/basic-data" title="Promocije za iznos korpe" columnFields={tblFields} showNewButton={true} />;
};

export default PromotionsCartSummary;