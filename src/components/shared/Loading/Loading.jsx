import { SixK } from "@mui/icons-material"
import { CircularProgress, Grid } from "@mui/material"

/**
 * Basic loading 
 *
 * @param {"string"|number} size The size of the component. If using a number, the pixel unit is assumed. If using a string, you need to provide the CSS unit, e.g '3rem'.
 */

const Loading = ({ size }) => (
  <Grid container justifyContent="center" >
    <CircularProgress size={size} />
  </Grid>
)

export default Loading
