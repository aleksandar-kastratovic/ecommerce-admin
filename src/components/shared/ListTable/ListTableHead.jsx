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
    <TableHead>
      <TableRow>
        {fields.map(({ propName, fieldName, sortable }) => (
          <TableCell
            className={styles.headStyle}
            key={propName}
            sortDirection={orderBy === propName ? order : false}
          >
            {sortable ? (
              <TableSortLabel
                active={orderBy === propName}
                direction={orderBy === propName ? order : "asc"}
                onClick={createSortHandler(propName)}
              >
                {fieldName}
              </TableSortLabel>
            ) : (
              <>{fieldName}</>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default ListTableHead;
