import { Box } from "@mui/material"
import { useState } from "react"
import PageWrapper from "../../Layout/PageWrapper/PageWrapper"
import DetailsList from "./DetailsList"

import styles from "./DetailsPage.module.scss"

/**
 * Render multiple panels.
 *
 * @param {string} title The title for the page.
 * @param {PanelSpec[]} fields The panels to render.
 * @param {[]} additionalButtons The additional buttons for the header.
 *
 * @return {JSX.Element}
 * @constructor
 */
const DetailsPage = ({ title, fields, additionalButtons = [] }) => {

    // Make sure all fields have and id
    fields = fields.map((field, index) => ({ ...field, id: field.id ?? index }))

    const [ selected, setSelected ] = useState(fields[0].id ?? null)

    return (
        <PageWrapper title={title} back={true} actions={additionalButtons}>
            <Box className={styles.details}>
                <Box className={styles.list}>
                    <DetailsList
                        fields={fields}
                        handleSelect={field => !field.disabled && setSelected(field.id)}
                        selected={selected}
                    />
                </Box>
                {fields.map((field) => {
                    if (field.id === selected) {
                        return (
                            <Box className={styles.main} key={field.id}>
                                {field.component}
                            </Box>
                        )
                    }
                    return null
                })}
            </Box>
        </PageWrapper>
    )
}

export default DetailsPage
