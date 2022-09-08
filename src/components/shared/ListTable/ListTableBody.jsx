import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import EmptyList from "../Empty/EmptyList"
import LoadingTableRows from "../Loading/LoadingTableRows"
import ActionField from "./ActionField/ActionField"
import { displayData } from "./util"
import scss from "./ListTableBody.module.scss"

/**
 * Show the table body and handle lifecycle and events.
 *
 * @param {[][]} items The items to show.
 * @param {[]} fields The definition of fields that are shown as columns.
 * @param {function(id: int, action: string)} handleActions The handler for the row actions.
 * @param {boolean} isLoading True if the table is still loading, false otherwise.
 * @param {?string} error An error message to show, or null if there is no error.
 *
 * @return {JSX.Element}
 * @constructor
 */
const ListTableBody = ({ items, fields, handleActions, isLoading = false, error = null }) => {

    // What to show
    let content
    switch (true) {
        case error !== null:
            content = <EmptyList span={fields.length} message={`Greška: ${error}`} />
            break

        case isLoading:
            content = <LoadingTableRows columns={fields.length} />
            break

        case (items ?? []).length === 0:
            content = <EmptyList span={fields.length} />
            break

        default:
            content = (items ?? []).map((row) => (
                <TableRow hover key={row.id}>
                    {fields.map(({ prop_name, input_type }) => (
                        <TableCell key={prop_name} className={scss[prop_name]}>
                            {prop_name !== "action"
                                ? displayData(row[prop_name], input_type)
                                : <ActionField
                                    fieldType={input_type}
                                    handleEdit={handleActions(row["id"], "edit")}
                                    handlePreview={handleActions(row["id"], "preview")}
                                    handleDelete={handleActions(row["id"], "delete")}
                                    handleListGroup={handleActions(row["id"], "listGroup")}
                                    handleCategoryTree={handleActions(row["id"], "categoryTree")}
                                    systemRequired={row.system_required} />
                            }
                        </TableCell>
                    ))}
                </TableRow>
            ))
    }

    return <TableBody>{content}</TableBody>
}

export default ListTableBody
