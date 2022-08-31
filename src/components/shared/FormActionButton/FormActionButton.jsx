import { Button as MaterialButton } from "@mui/material";
import scss from "./FormActionButton.module.scss";
import { Icon } from "@mui/material";
/**
 * A standardized button with an optional icon.
 *
 * @param {string} icon The optional icon to use. @see https://fonts.google.com/icons
 * @param {string} label The label on the button.
 * @param {function} onClick The callback to invoke when the button is clicked.
 * @param {"text"|"contained"|"outlined"} variant The variant of the button to use.
 *
 * @return {JSX.Element}
 * @constructor
 */
const FormActionButton = ({ icon, onClick, variant = "outlined" }) => (
  <MaterialButton onClick={onClick} variant={variant} className={scss.button}>
    {icon && <Icon className={scss.icon}>{icon}</Icon>}
  </MaterialButton>
);

export default FormActionButton;
