import Box from "@mui/material/Box"
import DebouncedInput from "../DebouncedInput/DebouncedInput"
import BasicDatePicker from "../BasicDatePicker/BasicDatePicker"
import ColumnsPicker from "./ColumnsPicker/ColumnsPicker"
import Button from "../Button/Button"
import { useState } from "react"
import FilterForm from "./FilterForm/FilterForm"
import styles from "./ListTableToolbar.module.scss"

const ListTableToolbar = ({ fields = [], filterFields = [], showDatePicker, onColumnsChange, onSearch}) => {
    const [ filterOpen, setFilterOpen ] = useState(false)

    return (
        <>
            <Box className={styles.toolbarButtons}>
                <DebouncedInput
                    placeholder="Ključne reci za pretragu"
                    ui_prop="search"
                    onChange={onSearch} />

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
                        setFilterOpen(!filterOpen)
                    }}
                />
            </Box>
            {filterOpen && (
                <FilterForm filterFields={filterFields} />
            )}
        </>
    )
}

export default ListTableToolbar
