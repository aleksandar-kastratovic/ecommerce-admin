import React, { useState } from "react";

import moment from "moment";

// material-ui components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Pagination from "@mui/material/Pagination";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { PaginationItem } from "@mui/material";

import ListTableHead from "./ListTableHead";
import styles from "./ListTable.module.scss";

const ListTable = ({
  fields = [],
  listData = [],
  handleEditClick = () => {},
  handleActions = () => {},
}) => {
  // Please use destructuring
  // Since on a project is not used strong type(for example typescript or even proptypes - deprecated)
  // it is recommended for all properties to give an initial value
  // In that way if you don't receive value app will not break and all developers will know what type to expect number, string or object, arr etc.

  const { items, pagination } = listData;

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const handleSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const displayData = (data, prop_name, input_type) => {
    let content;

    switch (input_type) {
      case "edit_icon":
        content = (
          <IconButton aria-label="edit" onClick={handleActions(data["module"])}>
            <ModeEditOutlineOutlinedIcon />
          </IconButton>
        );
        break;
      case "edit_preview":
        content = (
          <>
            <IconButton
              aria-label="edit"
              onClick={handleActions(data["id"], "edit")}
            >
              <ModeEditOutlineOutlinedIcon />
            </IconButton>
            <IconButton
              aria-label="preview"
              onClick={handleActions(data["id"], "preview")}
            >
              <VisibilityOutlinedIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={handleActions(data["id"], "delete")}
            >
              <DeleteIcon className={styles.deleteIcon} />
            </IconButton>
          </>
        );
        break;
      case "edit_delete":
        content = (
          <>
            <IconButton
              aria-label="edit"
              onClick={handleActions(data["id"], "edit")}
            >
              <ModeEditOutlineOutlinedIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={handleActions(data["id"], "delete")}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
        break;
      case "date_format":
        content = (
          <>
            {moment(data[prop_name]).isValid()
              ? moment(data[prop_name]).format("DD. MMM yyyy HH:mm A")
              : ""}
          </>
        );
        break;
      default:
        content = data[prop_name];
        break;
    }
    return content;
  };

  return (
    <>
      <TableContainer component={Paper} className={styles.tableStyle}>
        <Table>
          <ListTableHead
            fields={fields}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleSort}
            rowCount={fields.length}
          />
          {/* It is not recommended to use index as a key but in this case,
               you never know what could be the key for a data 
               that is received from api call */}
          <TableBody>
            {items &&
              items
                .sort(getComparator(order, orderBy))
                .map(({ ...data }, index) => (
                  <TableRow hover key={index}>
                    {fields.map(({ prop_name, input_type }) => (
                      <TableCell key={prop_name}>
                        {displayData(data, prop_name, input_type)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination?.total_pages > 1 && (
        <Pagination
          count={20}
          variant="outlined"
          shape="rounded"
          className={styles.pagination + " settings-pagination"}
          siblingCount={6}
        >
          <PaginationItem className={styles.paginationLink} />
        </Pagination>
      )}
    </>
  );
};

export default ListTable;
