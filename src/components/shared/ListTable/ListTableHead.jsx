import React from "react";

// material-ui components
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

// other imports
import styles from "./ListTableHead.module.scss";

const ListTableHead = ({
  fields = [],
  onRequestSort = () => {},
  order = "",
  orderBy = "",
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={styles.tableHead}>
      <TableRow>
        {fields.map(({ prop_name, field_name, sortable }) => (
          <TableCell
            className={styles.headStyle}
            key={prop_name}
            sortDirection={orderBy === prop_name ? order : false}
          >
            {sortable ? (
              <TableSortLabel
                active={orderBy === prop_name}
                direction={orderBy === prop_name ? order : "asc"}
                onClick={createSortHandler(prop_name)}
              >
                {field_name}
              </TableSortLabel>
            ) : (
              <>{field_name}</>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default ListTableHead;
