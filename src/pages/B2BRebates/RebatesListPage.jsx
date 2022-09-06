import ListPage from "../../components/shared/ListPage/ListPage"
import tblFields from "./ParamsListFields.json"

const RebatesListPage = () => (
  <ListPage
    apiUrl="admin/rebates"
    title="Rabati"
    columnFields={tblFields}
  />
)

export default RebatesListPage
