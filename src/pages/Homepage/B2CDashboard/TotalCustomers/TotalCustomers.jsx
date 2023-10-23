import Card from "../../../../components/shared/Card/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from '@mui/material/Typography';
import { Box, CardContent } from "@mui/material";
import img from "../../../../assets/images/ukupno-kupaca.png";

const TotalCustomers = ({ totalCustomersDataB2C }) => {

  return (
    <Card
      styleCard={{ display: "flex", flexDirection: "column", justifyContent: "center", boxShadow: "none", borderRadius: "1.4rem", backgroundColor: "var(--dashboardOrangeOp)" }}
      children={
        <>
          <CardHeader
            sx={{ '.MuiCardHeader-action': { marginTop: 0, marginRight: 0, marginBottom: 0 }, paddingBottom: 0 }}
            action={
              <Box sx={{ width: "3.75rem" }}>
                <img src={img} alt="Ukupan-kupaca" style={{ width: "100%" }} />
              </Box>
            }
            title={
              <Typography variant="h6" sx={{ color: "var(--text-color)", lineHeight: "1.3", fontSize: "0.9rem" }}>
                Ukupno <br /> registrovanih kupaca
              </Typography>
            }
          />
          <CardContent sx={{ "&.MuiCardContent-root:last-child": { paddingBottom: "1rem", paddingTop: "0.5rem" } }}>
            <Typography variant="h5" sx={{ fontWeight: 600, fontSize: "1.4rem", color: "var(--text-color)" }}>
              {totalCustomersDataB2C?.count ?? "-"}
            </Typography>
          </CardContent>
        </>
      }
    />
  )
}

export default TotalCustomers