import { Button as MaterialButton } from "@mui/material"
import scss from "./Button.module.scss"

/**
 * A standardized button with an optional icon.
 *
 * @param {JSX.Element} icon The optional icon to use.
 * @param {string} label The label on the button.
 * @param {function} onClick The callback to invoke when the button is clicked.
 * @param {"text"|"contained"|"outlined"} variant The variant of the button to use.
 *
 * @return {JSX.Element}
 * @constructor
 */
const Button = ({ icon, label, onClick, variant = "outlined" }) => (
  <MaterialButton onClick={onClick} variant={variant}>
    {icon && <i className={scss.icon}>{icon}</i>}
    {label}
  </MaterialButton>
)

export default Button
