import React, { useState } from "react";

// material-ui components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";

import ListTableHead from "./ListTableHead";
import styles from "./ListTable.module.scss";

const ListTable = ({
  fields = [],
  data = [],
  handleEditClick = () => {},
  handleCreateNew = () => {},
  title = "",
  showButton = false,
}) => {
  // error is for validations backend and frontend
  // Please use destructuring
  // Since on a project is not used strong type(for example typescript or even proptypes - deprecated)
  // it is recommended for all properties to give an initial value
  // In that way if you don't receive value app will not break and all developers will know what type to expect number, string or object, arr etc.
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const handleSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, data) => {
    console.log(data);
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
      case "iconButton":
        content = (
          <IconButton aria-label="edit" onClick={handleEditClick(data.id)}>
            <ModeEditOutlineOutlinedIcon />
          </IconButton>
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
      <Box className={styles.toolBarStyle}>
        <Typography variant="h5" component="div" className={styles.titleStyle}>
          {title}
        </Typography>
        {showButton && (
          <Button onClick={handleCreateNew} className={styles.tabsBtnCreate}>
            Kreiraj novi
            <AddIcon />
          </Button>
        )}
      </Box>
      <TableContainer component={Paper} className={styles.tableStyle}>
        <Table>
          <ListTableHead
            fields={fields}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleSort}
            rowCount={fields.length}
          />
          <TableBody>
            {data
              .sort(getComparator(order, orderBy))
              .map(({ ...data }, index) => (
                <TableRow hover key={index}>
                  {/* It is not recommended to use index as a key but in this case,
               you never know what could be the key for a data 
               that is received from api call */}
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={10}
        rowsPerPage={10}
        page={0}
        labelRowsPerPage="Odaberi broj prikazanih"
        onPageChange={handleChangePage}
        // onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ListTable;
