import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Icon } from "@mui/material"
import React from "react"

/**
 * Support for both MUI (as string) and FontAwesome icons (imported from @fortawesome/free-solid-svg-icons).
 *
 * @param {string|{}} icon String to load from MUI, or an object imported from @fortawesome/free-solid-svg-icons;
 *
 * @return {JSX.Element}
 * @constructor
 */
const Unicon = ({ icon }) => (
    typeof icon === "object"
        ? <FontAwesomeIcon icon={icon} />
        : <Icon>{icon}</Icon>
)

export default Unicon
