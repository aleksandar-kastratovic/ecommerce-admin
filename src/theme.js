import { createTheme } from "@mui/material/styles"
import scssVariables from "./variables.scss"

/** The MUI theme to use. */
const CroonusTheme = createTheme({
  palette: {
    primary: {
      main: scssVariables.theme
    }
  }
})

export default CroonusTheme
