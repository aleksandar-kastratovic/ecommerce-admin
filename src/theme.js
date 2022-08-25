import { createTheme } from "@mui/material/styles"
import scssVariables from "./variables.scss"

/** The MUI theme to use. */
const CroonusTheme = createTheme({
  palette   : {
    primary: {
      main: scssVariables.theme
    }
  },
  typography: {
    fontFamily: [ "Montserrat", "sans-serif" ].join(",")
  }
})

export default CroonusTheme
