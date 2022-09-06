import ListPage from "../../components/shared/ListPage/ListPage"
import tblFields from "./B2BRebatesFieldSpec.json"

const B2BRebatesListPage = () => (
    <ListPage
        apiUrl="admin/rebates"
        title="Rabati"
        columnFields={tblFields}
    />
)

export default B2BRebatesListPage
