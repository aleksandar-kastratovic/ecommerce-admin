import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({
  getRowId,
  rows = [],
  columns,
  loading,
  sx,
  rowCount,
  onChangePage,
  pageSize,
  page,
  hideFooterPagination,
  paginationMode,
  totalPages,
  total,
  selected,
  onChange,
  onSortChange,
  sortingMode
}) => {

  return (
    <DataGrid
      disableColumnMenu
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
      getRowId={getRowId}
      rows={rows}
      columns={columns}
      loading={loading}
      sx={sx}
      checkboxSelection={true}
      onPaginationModelChange={onChangePage}
      rowCount={rowCount}
      hideFooterPagination={hideFooterPagination}
      pageSizeOptions={[5, 10, 30, 50]}
      paginationModel={{ page, pageSize }}
      paginationMode={paginationMode}
      total={total}
      totalPages={totalPages}
      rowSelectionModel={selected}
      onRowSelectionModelChange={onChange}
      sortingMode={sortingMode}
      onSortModelChange={onSortChange}
      keepNonExistentRowsSelected
    />
  );
};

export default DataTable;