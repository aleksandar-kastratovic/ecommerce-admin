import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Pagination from "@mui/material/Pagination";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { PaginationItem, Stack, Typography } from "@mui/material";

import ListTableHead from "./ListTableHead";
import styles from "./ListTable.module.scss";
import ActionField from "./ActionField/ActionField";
import { displayData, getComparator } from "./util";
import LoadingTableRows from "../Loading/LoadingTableRows";
import EmptyList from "../Empty/EmptyList";

const ListTable = ({
  fields = [],
  listData = [],
  handleActions = () => {},
  isLoading = false,
  page = 1,
  onPageChange = () => {},
}) => {
  const { items, pagination } = listData;

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const handleSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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
          <TableBody>
            {!isLoading ? (
              <>
                {(items ?? []).length === 0 && (
                  <EmptyList span={fields.length} />
                )}
                {(items ?? [])
                  .sort(getComparator(order, orderBy))
                  .map(({ ...data }) => (
                    <TableRow hover key={data.id}>
                      {fields.map(({ prop_name, input_type }) => (
                        <TableCell key={prop_name}>
                          {prop_name === "action" ? (
                            <ActionField
                              field_type={input_type}
                              handleEdit={handleActions(data["id"], "edit")}
                              handlePreview={handleActions(
                                data["id"],
                                "preview"
                              )}
                              handleDelete={handleActions(data["id"], "delete")}
                            />
                          ) : (
                            displayData(data[prop_name], input_type)
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </>
            ) : (
              <LoadingTableRows columns={fields.length} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack className={styles.pagination + " settings-pagination"}>
        <Typography className={styles.paginationLabel}>
          {`${pagination?.items_per_page * (page - 1)}-${
            page !== pagination?.total_pages
              ? pagination?.items_per_page * page
              : pagination?.total_items
          } of ${pagination?.total_items}`}
        </Typography>
        <Pagination
          count={pagination?.total_pages}
          onChange={onPageChange}
          page={page}
          variant="outlined"
          shape="rounded"
          siblingCount={3}
        >
          <PaginationItem />
        </Pagination>
      </Stack>
    </>
  );
};

export default ListTable;
