import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TextBox from "../TextBox/TextBox";
import BasicDatePicker from "../BasicDatePicker/BasicDatePicker";
import Icon from "@mui/material/Icon";
import ColumnsPicker from "./ColumnsPicker/ColumnsPicker";
import Button from "../Button/Button";
import { useState } from "react";
import FilterForm from "./FilterForm/FilterForm";

import styles from "./ListTableToolbar.module.scss";

const ListTableToolbar = ({
  showDatePicker = true,
  searchValue = "",
  fields = [],
  filterFields = [],
  onColumnsChange = () => {},
  onSearch = () => {},
  onFilterChange = () => {},
}) => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <>
      <Box className={styles.toolbarButtons}>
        <TextBox
          placeholder="Ključne reci za pretragu"
          ui_prop="search"
          onChange={onSearch}
          value={searchValue}
          margin="0"
        />
        {showDatePicker && (
          <>
            <BasicDatePicker label="datum od" />
            <BasicDatePicker label="datum do" />
          </>
        )}
        <ColumnsPicker tableFields={fields} onChange={onColumnsChange} />
        <Button
          icon="tune"
          label="Filteri"
          onClick={() => {
            setFilterOpen(!filterOpen);
          }}
        />
      </Box>
      {filterOpen && (
        <FilterForm filterFields={filterFields} onChange={onFilterChange} />
      )}
    </>
  );
};

export default ListTableToolbar;
