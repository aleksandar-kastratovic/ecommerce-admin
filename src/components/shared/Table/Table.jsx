import Paper from "@mui/material/Paper"
import { Table as MaterialTable, TableContainer } from "@mui/material"
import scss from "./Table.module.scss"

/**
 * A universal table.
 *
 * @return {JSX.Element}
 * @constructor
 */
const Table = ({ children }) => (
  <TableContainer component={Paper} className={scss.table}>
    <MaterialTable>{children}</MaterialTable>
  </TableContainer>
)

export default Table
