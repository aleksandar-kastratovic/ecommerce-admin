import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

import { columnProps } from "../../../helpers/table";

const ListTableHead = ({ fields = [], onRequestSort, order, orderBy }) => {

  // Sorting by column
  const createSortHandler = (column: FieldSpec) => event => onRequestSort && onRequestSort(event, column.prop_name)
  const sortingDirection = (column: FieldSpec) => orderBy === column.prop_name ? order : false
  const sortableColumn = (column: FieldSpec) => (
    <TableSortLabel active={orderBy === column.prop_name} direction={sortingDirection(column)} onClick={createSortHandler(column)}>
      {column.field_name}
    </TableSortLabel>
  )

  return (
    <TableHead>
      <TableRow>
        {fields.map((column: FieldSpec) => (
          <TableCell sortDirection={sortingDirection(column)} {...columnProps(column, true)} >
            {column.sortable
              ? sortableColumn(column)
              : column.field_name
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default ListTableHead
