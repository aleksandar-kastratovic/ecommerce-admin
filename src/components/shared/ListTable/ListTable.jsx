import React, { useState } from "react"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"
import ListPagination from "./ListPagination/ListPagination"
import ListTableBody from "./ListTableBody"
import ListTableHead from "./ListTableHead"
import styles from "./ListTable.module.scss"
import { getComparator } from "./util"

const ListTable = ({ fields = [], listData = [], isLoading = false, onPageChange, handleActions }) => {
    const { items, pagination } = listData
    const [ order, setOrder ] = useState("asc")
    const [ orderBy, setOrderBy ] = useState("name")

    const handleSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc"
        setOrder(isAsc ? "desc" : "asc")
        setOrderBy(property)
    }

    // Show the table
    return (
        <>
            <TableContainer className={styles.wrapper}>
                <Table>

                    <ListTableHead
                        fields={fields}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleSort}
                        rowCount={fields.length} />

                    <ListTableBody
                        items={items ?? []}
                        fields={fields}
                        isLoading={isLoading}
                        handleActions={handleActions}
                        error={null} />

                </Table>
            </TableContainer>

            <ListPagination pagination={pagination} onPageChange={onPageChange} />
        </>
    )
}

export default ListTable
