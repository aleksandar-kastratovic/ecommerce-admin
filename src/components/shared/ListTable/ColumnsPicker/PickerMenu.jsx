import { Box, Typography } from "@mui/material"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import Menu from "@mui/material/Menu"
import { useState } from "react"
import { toast } from "react-toastify"
import { createPairs } from "../../../../helpers/data"
import Button from "../../Button/Button"
import Buttons from "../../Form/Buttons/Buttons"
import styles from "./ColumnsPicker.module.scss"

const PickerMenu = ({ anchor = null, tableFields = [], handleConfirm, handleClose }) => {

    // Not all columns can be hidden
    const [ visibleColumns, setVisibleColumns ] = useState(createPairs(tableFields, "prop_name", "in_main_table"))

    // Handle each time a user click a checkbox
    const handleChange = ({ target }) =>
        setVisibleColumns(visibleColumns => {

            // Count the number of visible columns
            let visibleColumnsCount = 0
            for (const column of tableFields.filter(isColumnToggleable)) {
                visibleColumnsCount += visibleColumns[column.prop_name] ? 1 : 0
            }

            // At least one column must be selected
            if (visibleColumnsCount > 1 || target.checked) {
                visibleColumns[target.name] = target.checked
            } else {
                toast.warning("Bar jedna kolona mora ostati vidljiva")
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
                    <Typography>Odaberite kolone za prikaz</Typography>
                    <FormGroup>
                        {tableFields.filter(isColumnToggleable).map(item => (
                            <FormControlLabel
                                label={item.field_name}
                                key={item.prop_name}
                                control={
                                    <Checkbox
                                        checked={visibleColumns[item.prop_name]}
                                        onChange={handleChange}
                                        name={item.prop_name} />
                                }
                            />
                        ))}
                    </FormGroup>

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
