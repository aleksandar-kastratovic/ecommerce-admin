import React, { useEffect, useState, useRef } from "react";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

import ListPagination from "./ListPagination/ListPagination";
import ListTableBody from "./ListTableBody";
import ListTableHead from "./ListTableHead";

import styles from "./ListTable.module.scss";

const ListTable = ({ fields = [], listData = [], isLoading = false, onPageChange, handleOnClickActions, previewColumn, showAddButtonTableRow, tooltipAddButtonTableRow, customActions, onClickFieldBehavior }) => {
  const { items, pagination } = listData;
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const tableContainerRef = useRef(null);

  const handleSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 0;
    }
  }, [pagination]);

  // Show the table
  return (
    <>
      <TableContainer ref={tableContainerRef} className={styles.wrapper}>
        <Table>
          <ListTableHead fields={fields} order={order} orderBy={orderBy} onRequestSort={handleSort} rowCount={fields.length} />

          <ListTableBody items={items ?? []} fields={fields} isLoading={isLoading} handleOnClickActions={handleOnClickActions} error={null} previewColumn={previewColumn} showAddButtonTableRow={showAddButtonTableRow} tooltipAddButtonTableRow={tooltipAddButtonTableRow} customActions={customActions} onClickFieldBehavior={onClickFieldBehavior} />
        </Table>
      </TableContainer >

      <ListPagination pagination={pagination} onPageChange={onPageChange} />
    </>
  );
};

export default ListTable;
