import { Skeleton, TableCell, TableRow } from "@mui/material"

/**
 * Show loading table rows.
 *
 * @param {columns} columns The number of columns to show.
 * @param {number} rows The number of rows to show.
 *
 * @return {JSX.Element}
 * @constructor
 */
const LoadingTableRows = ({ columns, rows = 8 }) => (
  <>
    {Array(+rows).fill(null).map((val, key) => (
      <TableRow key={key}>
        {Array(+columns).fill(null).map((val, key) => (
          <TableCell key={key}>
            <Skeleton variant="text" height={60} key={key} />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
)

export default LoadingTableRows
