import ListPage from "../../components/shared/ListPage/ListPage"
import tblFields from "./ParamsListFields.json"

const B2BRebatesListPage = () => (
  <ListPage
    apiUrl="admin/rebates"
    title="Rabati"
    columnFields={tblFields}
  />
)

export default B2BRebatesListPage
