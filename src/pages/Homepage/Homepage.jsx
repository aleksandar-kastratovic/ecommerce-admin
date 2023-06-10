import { useContext } from "react";

import Paper from "@mui/material/Paper";
import logo from "../../assets/images/croonus-sidebar-logo-dark.svg";
import Typography from '@mui/material/Typography';
import AuthContext from "../../store/auth-contex";

const Homepage = () => {

  const authCtx = useContext(AuthContext);

  return (
    <Paper elevation={0} sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "2rem" }}>

      <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
        Poštovani, {authCtx.user?.user?.first_name + " " + authCtx.user?.user?.last_name}, dobrodošli u administrativni panel
      </Typography>

      <img src={logo} alt="Logo" width="210px" />
    </Paper>
  )
}

export default Homepage
