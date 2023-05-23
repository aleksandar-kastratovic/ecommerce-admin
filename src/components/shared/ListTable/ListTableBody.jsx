import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { columnCell, columnProps } from "../../../helpers/table";
import EmptyList from "../Empty/EmptyList";
import LoadingTableRows from "../Loading/LoadingTableRows";
import ActionField from "./ActionField/ActionField";
import { useState } from "react";

/**
 * Show the table body and handle lifecycle and events.
 *
 * @param {[][]} items The items to show.
 * @param {[]} fields The definition of fields that are shown as columns.
 * @param {function(id: int, action: string)} handleOnClickActions The handler for the row actions.
 * @param {boolean} isLoading True if the table is still loading, false otherwise.
 * @param {?string} error An error message to show, or null if there is no error.
 * @param {string default:"id"} error Column value that is sent to preview page
 * @param {boolean} showAddButtonTableRow Add a button "add row" to the table (if needed in the future).
 * @param {string} tooltipAddButtonTableRow Add title to tooltip (if needed in the future).
 * @param {Object{type: {handler:function, icon: ""}}} customActions To display icons.
 *
 * @return {JSX.Element}
 * @constructor
 */
const ListTableBody = ({ items, fields, handleOnClickActions, isLoading = false, error = null, previewColumn = "id", showAddButtonTableRow = false, tooltipAddButtonTableRow, customActions }) => {
  const [editingCell, setEditingCell] = useState(null); // stanje koje se koristi da se pamti koji je redak i kolona trenutno u procesu uređivanja
  const handleCellDoubleClick = (event, rowId, columnPropName, currentValue) => {
    setEditingCell({ rowId, columnPropName }); // pamti koji se ćelija trenutno uređuje
  };


  const handleCellBlur = (event, rowId, columnPropName, currentValue) => {
    setEditingCell(null); // resetuje stanje kada korisnik završi sa uređivanjem ćelije

    // Pronađi ćeliju u state-u
    const editedRow = tableData.find((data) => data.id === rowId);
    const editedCell = editedRow[columnPropName];

    // Ako se vrednost ćelije promenila, sačuvaj promene na backendu
    if (currentValue !== editedCell.value) {
      const newData = [...tableData];
      editedCell.value = currentValue;
      setTableData(newData);
      handleOnClickActions(rowId, "edit", { [columnPropName]: currentValue });
    }
  };

  const actionButtons = () => {
    let buttons = {};

    buttons.edit = {
      type: "edit",
      display: true,
      icon: "edit",
      title: "Izmeni",
      position: 1,
    };

    buttons.delete = {
      type: "delete",
      display: true,
      icon: "delete",
      title: "Obriši",
      position: 1000,
    };

    buttons.preview = {
      type: "preview",
      display: false,
      icon: "preview",
      title: "Pregledaj",
      position: 2,
    };

    if (typeof customActions === "object") {
      Object.keys(customActions).map((key) => {

        switch (true) {
          case key == 'edit':
          case key == 'delete':
          case key == 'preview':
            buttons[key] = Object.assign({}, buttons[key], { ...customActions[key] });
            break;
          default:
            buttons[key] = customActions[key];
            break;
        }
      });
    }

    return buttons;
  };

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
        <TableRow hover key={row.id} >
          {/* TODO typeannotation sluzi samo u typescript, da li je ovde podrebna anotacija i cemu sluzi? */}
          {fields.map((column) => (
            <TableCell
              key={`${row.id}-${column.prop_name}`}
              {...columnProps(column)}
              onDoubleClick={(event) => handleCellDoubleClick(event, row.id, column.prop_name, row[column.prop_name])}

            >
              {column.prop_name !== "action" ? (
                // columnCell(row[column.prop_name], column.input_type)
                // editingCell?.rowId === row.id && editingCell?.columnPropName === column.prop_name ? (
                //   // ako je ćelija u procesu uređivanja, prikazuje se input polje sa trenutnom vrednošću
                //   <input type={column.input_type} defaultValue={row[column.prop_name]} />
                // ) : (
                // inače, prikazuje se samo trenutna vrednost ćelije
                columnCell(row[column.prop_name], column.input_type)

              ) : (
                <ActionField
                  fieldType={column.input_type}
                  systemRequired={row.system_required}
                  customActions={actionButtons()}
                  handleOnClickActions={handleOnClickActions}
                  rowData={row}
                />
              )}
            </TableCell>
          ))}
        </TableRow>
      ));

      if (showAddButtonTableRow) {
        content.push(
          <TableRow hover key="add">
            <TableCell colSpan={fields.length} align="center">
              <Tooltip title={tooltipAddButtonTableRow} placement="top" arrow>
                <IconButton
                  size="small"
                >
                  <Icon>add</Icon>
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        );
      }

  }

  return <TableBody>{content}</TableBody>;
};

export default ListTableBody;
