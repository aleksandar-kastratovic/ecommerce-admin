import ListPage from "../../components/shared/ListPage/ListPage"
import fields from "./fields.json"

const B2BRebateTiersListPage = () => (
    <ListPage
        apiUrl="admin/rebates/tiers"
        title="Rabatne skale"
        columnFields={fields} />
)

export default B2BRebateTiersListPage
