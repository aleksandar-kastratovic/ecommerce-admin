import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableSortLabel from "@mui/material/TableSortLabel"
import styles from "./ListTableHead.module.scss"

const ListTableHead = ({ fields = [], onRequestSort, order, orderBy }) => {

    // Sorting by column
    const createSortHandler = (column: FieldSpec) => event => onRequestSort && onRequestSort(event, column.prop_name)
    const sortingDirection = (column: FieldSpec) => orderBy === column.prop_name ? order : false
    const sortableColumn = (column: FieldSpec) => (
        <TableSortLabel active={orderBy === column.prop_name} direction={sortingDirection(column)} onClick={createSortHandler(column)}>
            {column.field_name}
        </TableSortLabel>
    )

    // Get the width of the column
    const columnWidth = (column: FieldSpec) => column.prop_name === "action" ? "120" : null

    return (
        <TableHead>
            <TableRow>
                {fields.map((column: FieldSpec) => (
                    <TableCell key={column.prop_name} className={styles.headStyle} sortDirection={sortingDirection(column)} width={columnWidth(column)}>
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
