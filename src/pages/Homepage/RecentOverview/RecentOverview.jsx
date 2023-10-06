import Card from "../../../components/shared/Card/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from "react-router-dom";

const RecentOverview = ({ recentOverview }) => {
  return (
    <Card
      styleCard={{ display: "flex", flexDirection: "column", gridColumn: "2/-1", boxShadow: "none" }}
      children={
        <>
          <CardHeader
            title={<Typography variant="h6" sx={{ color: "var(--text-color)" }}>Poslednje kupovine</Typography>}
          />
          <CardContent>
            <TableContainer>
              {recentOverview?.items?.length ?
                <Table className="dashboardTable">
                  <TableHead>
                    <TableRow>
                      <TableCell>Broj</TableCell>
                      <TableCell>Kupac</TableCell>
                      <TableCell>Datum</TableCell>
                      <TableCell>Cena</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOverview?.items.map((row) => (
                      <TableRow TableRow key={row.id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "var(--main-bg-color)" }, border: 0 }}>
                        <TableCell>
                          <Link to={`/b2c-orders/${row.id}`}>{row.slug}</Link>
                        </TableCell>
                        <TableCell>{row.bill_to_name}</TableCell>
                        <TableCell>{row.created_at}</TableCell>
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

export default RecentOverview