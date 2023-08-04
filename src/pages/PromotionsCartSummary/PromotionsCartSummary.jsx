import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./PromotionsCartSummaryDetails/forms/basic_data.json";

const PromotionsCartSummary = () => {

  return <ListPage listPageId="PromotionsCartSummary" apiUrl="admin/campaigns/cart-summary/list" deleteUrl="admin/campaigns/cart-summary/list" title="Promocije za iznos u korpi" columnFields={tblFields} showNewButton={true} />;
};

export default PromotionsCartSummary;
