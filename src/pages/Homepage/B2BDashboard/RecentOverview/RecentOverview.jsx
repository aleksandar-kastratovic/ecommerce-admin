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
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

const RecentOverview = ({ recentOverviewB2B }) => {

  const getItemQuantityText = (count) => {
    switch (count) {
      case 1:
        return 'Artikal';
      default:
        return 'Artikla';
    }
  };

  return (
    <Card
      styleCard={{ display: "flex", flexDirection: "column", gridColumn: "3/-1", boxShadow: "none", "@media (max-width: 1200px)": { gridColumn: "1/-1" } }}
      children={
        <>
          <CardHeader
            title={<Typography variant="h6" sx={{ color: "var(--text-color)" }}>Poslednje kupovine</Typography>}
          />
          <CardContent>
            <TableContainer>
              {recentOverviewB2B?.items?.length ?
                <Table className="dashboardTable">
                  <TableBody>
                    {recentOverviewB2B?.items.map((row) => (
                      <TableRow TableRow key={row.id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "var(--main-bg-color)" }, border: 0 }}>
                        <TableCell>
                          <Link to={`/b2c-orders/${row.id}`} style={{ display: "flex", flexDirection: "column", width: "fit-content", textAlign: "center" }}>
                            <span>{row.slug}</span>
                            <span style={{ color: "var(--text-color)", fontWeight: "600" }}>{row.bill_to_name}</span>
                          </Link>
                        </TableCell>
                        <TableCell sx={{ display: "flex", flexDirection: "column" }}>
                          <Box sx={{ display: "flex", flexDirection: "column", width: "fit-content", textAlign: "center" }}>
                            <span>{row.created_at}</span>
                            <span>{row.items_count} {getItemQuantityText(row.items_count)}</span>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", flexDirection: "column", width: "fit-content", textAlign: "center" }}>
                            <span>Ukupno:</span>
                            <span style={{ fontWeight: "600" }}>{row.total}</span>
                          </Box>
                        </TableCell>
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