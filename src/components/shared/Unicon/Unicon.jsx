import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icon from "@mui/material/Icon";


/**
 * Support for both MUI (as string) and FontAwesome icons (imported from @fortawesome/free-solid-svg-icons).
 * @see https://mui.com/material-ui/material-icons/.
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
