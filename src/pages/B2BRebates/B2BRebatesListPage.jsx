import ListPage from "../../components/shared/ListPage/ListPage"
import fields from "./fields.json"

const B2BRebatesListPage = () => (
    <ListPage
        apiUrl="admin/rebates"
        title="Rabati"
        columnFields={fields} />
)

export default B2BRebatesListPage
