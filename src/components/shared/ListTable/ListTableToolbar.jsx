import Box from "@mui/material/Box"
import IconList from "../../../helpers/icons"
import DebouncedInput from "../DebouncedInput/DebouncedInput"
import BasicDatePicker from "../BasicDatePicker/BasicDatePicker"
import ColumnsPicker from "./ColumnsPicker/ColumnsPicker"
import Button from "../Button/Button"
import { useState } from "react"
import FilterForm from "./FilterForm/FilterForm"
import styles from "./ListTableToolbar.module.scss"

const ListTableToolbar = ({ fields = [], filterFields, showDatePicker, onColumnsChange, onSearch }) => {
    const [ filterOpen, setFilterOpen ] = useState(false)

    return (
        <>
            <Box className={styles.toolbarButtons}>

                {/* Search by term*/}
                <DebouncedInput
                    placeholder="Ključne reci za pretragu"
                    ui_prop="search"
                    onChange={onSearch} />

                {/* Search by data picker */}
                {showDatePicker && (
                    <>
                        <BasicDatePicker label="datum od" />
                        <BasicDatePicker label="datum do" />
                    </>
                )}

                {/* Filter */}
                {filterFields && (
                    <Button icon={IconList.filterList} label="Filteri" onClick={() => setFilterOpen(!filterOpen)} />
                )}

                {/* Choose visible columns */}
                <ColumnsPicker tableFields={fields} onChange={onColumnsChange} />
            </Box>
            {filterOpen && (
                <FilterForm filterFields={filterFields} />
            )}
        </>
    )
}

export default ListTableToolbar
