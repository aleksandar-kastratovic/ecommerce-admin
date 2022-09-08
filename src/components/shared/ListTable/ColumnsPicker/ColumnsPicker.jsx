import { useState } from "react"
import PickerMenu from "./PickerMenu"
import Button from "../../Button/Button"

const ColumnsPicker = ({ tableFields = [], onChange }) => {
    const [ anchor, setAnchor ] = useState(null)

    /** Pass changed values to parent. **/
    const handleConfirm = (data) => {
        onChange && onChange(data)
        setAnchor(null)
    }

    return (
        <>
            <PickerMenu
                anchor={anchor}
                tableFields={tableFields}
                handleConfirm={handleConfirm}
                handleClose={() => setAnchor(null)}
            />
            <Button icon="settings" label="Kolone" onClick={event => setAnchor(event.currentTarget)} />
        </>
    )
}

export default ColumnsPicker
