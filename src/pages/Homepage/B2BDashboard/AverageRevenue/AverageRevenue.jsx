import Card from "../../../../components/shared/Card/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from '@mui/material/Typography';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Box, CardContent } from "@mui/material";
import img from "../../../../assets/images/prosecan-iznos-korpe.png";

const AverageRevenue = ({ averageRevenueB2B }) => {

  return (
    <Card
      styleCard={{ display: "flex", flexDirection: "column", justifyContent: "center", boxShadow: "none", borderRadius: "1.4rem", backgroundColor: "var(--dashboardBlueOp)" }}
      children={
        <>
          <CardHeader
            sx={{ '.MuiCardHeader-action': { marginTop: 0, marginRight: "0", marginBottom: 0 }, paddingBottom: 0 }}
            action={
              <Box sx={{ width: "3.75rem" }}>
                <img src={img} alt="Ukupan-prihod-od-prodaje" style={{ width: "100%" }} />
              </Box>
            }

            title={
              <Typography variant="h6" sx={{ color: "var(--text-color)", lineHeight: "1.3", fontSize: "0.9rem" }}>
                Prosečan <br /> iznos narudžbenice
              </Typography>
            }
          />
          <CardContent sx={{ "&.MuiCardContent-root:last-child": { paddingBottom: "1rem", paddingTop: "0.5rem" } }}>
            {averageRevenueB2B?.map((total) => {
              return (
                <Typography key={total?.total} variant="h5" sx={{ fontWeight: 600, fontSize: "1.4rem", position: "relative", width: "fit-content", color: "var(--text-color)" }}>
                  {total?.total ?? "-"} <span style={{ marginRight: "0.5rem" }}>{total?.currency.toUpperCase()}</span>
                  {total?.status !== null &&
                    <span style={{ display: "flex", alignItems: "center", fontSize: "0.7rem", color: total?.status === "plus" ? "var(--green)" : "var(--red)" }}>
                      {total?.status === "plus" ? <ArrowCircleUpIcon sx={{ fontSize: "1.3rem", marginRight: "0.1rem" }} /> : <ArrowCircleDownIcon sx={{ fontSize: "1.3rem", marginRight: "0.1rem" }} />}
                      {total?.percentage} (za period od 90 dana)
                    </span>}
                </Typography>
              )
            })}
          </CardContent>
        </>
      }
    />
  )
}

export default AverageRevenue