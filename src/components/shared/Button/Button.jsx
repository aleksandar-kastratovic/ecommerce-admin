import { useRef } from "react";
import { Button as MaterialButton } from "@mui/material";
import scss from "./Button.module.scss";
import Icon from "@mui/material/Icon";

/**
 * A standardized button with an optional icon.
 *
 * @param {string} icon The optional icon to use, @see https://mui.com/material-ui/material-icons/.
 * @param {string} label The label on the button.
 * @param {function} onClick The callback to invoke when the button is clicked.
 * @param {"button"|"reset"|"submit"} type The HTML button type.
 * @param {"text"|"contained"|"outlined"} variant The variant of the button to use.
 * @param {boolean} disabled If button is disabled
 *
 *
 * @return {JSX.Element}
 * @constructor
 */
const Button = ({ refForward, icon, label, onClick, type = "button", variant = "outlined", disabled = false, sx = {} }) => {
  return (
    <MaterialButton ref={refForward} onClick={onClick} variant={variant} className={scss.button} type={type} disabled={disabled} sx={sx}>
      {icon && <Icon className={scss.icon}>{icon}</Icon>}
      {label}
    </MaterialButton>
  );
};

export default Button;
