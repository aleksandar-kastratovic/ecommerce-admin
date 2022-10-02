import { Box, Typography } from "@mui/material"
import FormControl from "@mui/material/FormControl"
import Menu from "@mui/material/Menu"
import { useState } from "react"
import { createPairs } from "../../../../helpers/data"
import Button from "../../Button/Button"
import Buttons from "../../Form/Buttons/Buttons"
import { InputCheckbox } from "../../Form/FormInputs/FormInputs"
import styles from "./ColumnsPicker.module.scss"

const PickerMenu = ({ anchor = null, tableFields = [], handleConfirm, handleClose }) => {

    // Show errors on the list
    const [ errorInput, setErrorInput ] = useState(null)
    const errorMessage = "Bar jedna kolona mora ostati vidljiva"

    // Not all columns can be hidden
    const [ visibleColumns, setVisibleColumns ] = useState(createPairs(tableFields, "prop_name", "in_main_table"))

    // Handle each time a user click a checkbox
    const handleChange = ({ target }, checked) =>
        setVisibleColumns(visibleColumns => {
            setErrorInput(null)

            // Count the number of visible columns
            let visibleColumnsCount = 0
            for (const column of tableFields.filter(isColumnToggleable)) {
                visibleColumnsCount += visibleColumns[column.prop_name] ? 1 : 0
            }

            // At least one column must be selected
            if (visibleColumnsCount > 1 || checked) {
                visibleColumns[target.name] = checked
            } else {
                setErrorInput(target.name)
            }

            // If returned without {} state is not refreshed
            return { ...visibleColumns }
        })

    // Apply the selected columns
    const onConfirm = () =>
        handleConfirm(tableFields.map(item => ({ ...item, in_main_table: visibleColumns[item.prop_name] })))

    // Check if the column is toggleable
    const isColumnToggleable = (column: FieldSpec): boolean =>
        column.field_name !== ""

    return (
        <Menu id="column-picker-menu" anchorEl={anchor} open={anchor !== null} onClose={handleClose}>
            <Box className={styles.formStyle}>
                <FormControl className={styles.formControl} component="fieldset" variant="standard">
                    {tableFields.filter(isColumnToggleable).map(item => (
                        <InputCheckbox
                            key={item.prop_name}
                            name={item.prop_name}
                            label={item.field_name}
                            value={visibleColumns[item.prop_name]}
                            error={errorInput === item.prop_name ? errorMessage : null}
                            onChange={handleChange} />
                    ))}

                    <Buttons>
                        <Button variant="contained" label="Odaberi" onClick={onConfirm} />
                        <Button variant="outlined" label="Otkaži" onClick={handleClose} />
                    </Buttons>
                </FormControl>
            </Box>
        </Menu>
    )
}

export default PickerMenu
