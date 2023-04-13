import React, { useState } from "react";

// import Table from "@mui/material/Table";
// import TableContainer from "@mui/material/TableContainer";

// import ListPagination from "./ListPagination/ListPagination";
// import ListTableBody from "./ListTableBody";
// import ListTableHead from "./ListTableHead";

import DataTable from "../DataTable/DataTable";
import { v4 } from "uuid";

import styles from "./ListTable.module.scss";

const ListTable = ({ fields = [], listData = [], isLoading = false, onPageChange, handleActions, previewColumn }) => {
  const { items, pagination } = listData;
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  // console.log("items", previewColumn)

  const handleSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Show the table
  return (
    <>
      {/* <TableContainer className={styles.wrapper}>
        <Table>
          <ListTableHead fields={fields} order={order} orderBy={orderBy} onRequestSort={handleSort} rowCount={fields.length} />

          <ListTableBody items={items ?? []} fields={fields} isLoading={isLoading} handleActions={handleActions} error={null} previewColumn={previewColumn} />
        </Table>
      </TableContainer>

      <ListPagination pagination={pagination} onPageChange={onPageChange} /> */}
      <DataTable
        rows={items ?? []}
        columns={fields}
        loading={isLoading}
        onChangePage={onPageChange}
        getRowId={(row) => row.id || v4()}
        hideFooterPagination={false}
      // rowCount={5}
      // pageSize={5}
      />
    </>
  );
};

export default ListTable;
