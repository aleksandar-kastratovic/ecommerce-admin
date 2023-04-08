import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { columnCell, columnProps } from "../../../helpers/table";
import EmptyList from "../Empty/EmptyList";
import LoadingTableRows from "../Loading/LoadingTableRows";
import ActionField from "./ActionField/ActionField";

/**
 * Show the table body and handle lifecycle and events.
 *
 * @param {[][]} items The items to show.
 * @param {[]} fields The definition of fields that are shown as columns.
 * @param {function(id: int, action: string)} handleActions The handler for the row actions.
 * @param {boolean} isLoading True if the table is still loading, false otherwise.
 * @param {?string} error An error message to show, or null if there is no error.
 * @param {string default:"id"} error Column value that is sent to preview page
 *
 * @return {JSX.Element}
 * @constructor
 */
const ListTableBody = ({ items, fields, handleActions, isLoading = false, error = null, previewColumn = "id" }) => {
  // What to show
  let content;
  switch (true) {
    case error !== null:
      content = <EmptyList span={fields.length} message={`Greška: ${error}`} />;
      break;

    case isLoading:
      content = <LoadingTableRows columns={fields.length} />;
      break;

    case (items ?? []).length === 0:
      content = <EmptyList span={fields.length} />;
      break;

    default:
      content = (items ?? []).map((row) => (
        <TableRow hover key={row.id}>
          {/* TODO typeannotation sluzi samo u typescript, da li je ovde podrebna anotacija i cemu sluzi? */}
          {fields.map((column) => (
            <TableCell {...columnProps(column)}>
              {column.prop_name !== "action" ? (
                columnCell(row[column.prop_name], column.input_type)
              ) : (
                <ActionField
                  fieldType={column.input_type}
                  handleEdit={handleActions(row[previewColumn], "edit")}
                  handlePreview={handleActions(row["id"], "preview")}
                  handleDelete={handleActions(row["id"], "delete")}
                  handleListGroup={handleActions(row["id"], "listGroup")}
                  handleCategoryTree={handleActions(row["id"], "categoryTree")}
                  handleChangePassword={handleActions(row["id"], "changePassword")}
                  systemRequired={row.system_required}
                />
              )}
            </TableCell>
          ))}
        </TableRow>
      ));
  }

  return <TableBody>{content}</TableBody>;
};

export default ListTableBody;
