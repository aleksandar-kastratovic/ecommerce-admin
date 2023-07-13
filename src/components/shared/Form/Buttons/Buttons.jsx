import { Box } from "@mui/material"
import scss from "./Buttons.module.scss"

/**
 * Show a list of buttons and the end of the form.
 *
 * @param {JSX.Element[]} children The buttons to render.
 *
 * @return {JSX.Element}
 * @constructor
 */
const Buttons = ({ children, styleWrapperButtons }) => (

  <Box className={scss.wrapper} sx={styleWrapperButtons}>
    {children}
  </Box>
)

export default Buttons
