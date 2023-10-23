import Card from "../../../../components/shared/Card/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Tooltip } from "@mui/material";


const TopBuyer = ({ cusTopBuyerB2C, cusGuestOrderedPercentageB2C, cusNeverOrderedPercentageB2C, cusSingleOrderPercentageB2C }) => {

  return (
    <Card
      styleCard={{ display: "flex", flexDirection: "column", gridColumn: "2/3", boxShadow: "none", "@media (max-width: 1200px)": { gridColumn: "1/-1" } }}
      children={
        <>
          <CardHeader
            title={<Typography variant="h6" sx={{ color: "var(--text-color)" }}>Kupci</Typography>}
          />
          <CardContent>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
              <Box sx={{ textAlign: "center" }}>
                <Box sx={{ position: 'relative', display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.5rem" }}>
                  <CircularProgress variant="determinate" value={parseFloat(cusSingleOrderPercentageB2C?.label)} sx={{ color: "var(--dashboardOrange)" }} size={65} />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: "600", fontSize: "0.875rem" }}
                      variant="caption"
                      component="div"
                    >{`${Math.round(cusSingleOrderPercentageB2C?.percentage)}%`}</Typography>
                  </Box>
                </Box>
                <span style={{ fontSize: "0.875rem" }}>Sa jednom <br /> kupovinom</span>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Box sx={{ position: 'relative', display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.5rem" }}>
                  <CircularProgress variant="determinate" value={parseFloat(cusNeverOrderedPercentageB2C?.label)} sx={{ color: "var(--dashboardBlue)" }} size={65} />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: "600", fontSize: "0.875rem" }}
                      variant="caption"
                      component="div"
                    >{`${Math.round(cusNeverOrderedPercentageB2C?.percentage)}%`}</Typography>
                  </Box>
                </Box>
                <span style={{ fontSize: "0.875rem" }}>Nemaju <br /> kupovinu</span>
              </Box>


              <Box sx={{ textAlign: "center" }}>
                <Box sx={{ position: 'relative', display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.5rem" }}>
                  <CircularProgress variant="determinate" value={parseFloat(cusGuestOrderedPercentageB2C?.label)} size={65} />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: "600", fontSize: "0.875rem" }}
                      variant="caption"
                      component="div"
                    >{`${Math.round(cusGuestOrderedPercentageB2C?.percentage)}%`}</Typography>
                  </Box>
                </Box>
                <span style={{ fontSize: "0.875rem" }}>Neregistrovan <br /> kupac</span>
              </Box>

            </Box>
            <TableContainer>
              {cusTopBuyerB2C?.length > 0 ?
                <Table className="dashboardTable">
                  <TableHead>
                    <TableRow>
                      {/* <TableCell></TableCell> */}
                      <TableCell></TableCell>
                      <TableCell>Broj kupovina</TableCell>
                      <TableCell>Iznos</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cusTopBuyerB2C?.map((row) => (
                      <TableRow key={row.name} sx={{ "&:nth-of-type(odd)": { backgroundColor: "var(--main-bg-color)" }, border: 0 }}>
                        <TableCell sx={{ display: "flex", alignItems: "center" }}>
                          {row.name}{row.type === "register" ? <Tooltip title="Registrovan kupac" arrow placement="top"><HowToRegIcon sx={{ color: "var(--theme)", fontSize: "1.2rem", marginLeft: "0.3rem" }} /></Tooltip> : null}</TableCell>
                        <TableCell>{row.count}</TableCell>
                        <TableCell>{row.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                : <Typography variant="body2" sx={{ color: "var(--text-color)", fontSize: "0.875rem", marginTop: "2rem" }}>Trenutno nema podataka za prikaz.</Typography>}
            </TableContainer>
          </CardContent>
        </>
      }
    />
  )
}

export default TopBuyer