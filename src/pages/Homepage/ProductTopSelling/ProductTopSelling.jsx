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
import Card from "../../../components/shared/Card/Card";
import Box from "@mui/material/Box";

const ProductTopSelling = ({ productTopSelling, productActiveCount, productLowStockCount }) => {

  return (
    <Card
      styleCard={{ display: "flex", flexDirection: "column", gridColumn: "1/2", boxShadow: "none" }}
      children={
        <>
          <CardHeader
            title={<Typography variant="h6" sx={{ color: "var(--text-color)" }}>Proizvodi</Typography>}
          />
          <CardContent>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
              <Box sx={{ textAlign: "center", fontSize: "0.875rem", color: "var(--text-color)" }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {productActiveCount?.count ?? 0}
                </Typography>
                Aktivnih proizvoda
              </Box>
              <Box sx={{ textAlign: "center", fontSize: "0.875rem", color: "var(--text-color)" }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {productLowStockCount?.count ?? 0}
                </Typography>
                Male količine
              </Box>
            </Box>
            <TableContainer>
              {productTopSelling?.length > 0 ?
                <Table className="dashboardTable">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Proizvod</TableCell>
                      <TableCell>Količina</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productTopSelling?.map((row) => (
                      <TableRow key={row.id_product} sx={{ "&:nth-of-type(odd)": { backgroundColor: "var(--main-bg-color)" }, border: 0 }}>
                        <TableCell>
                          <Link to={`/products/${row.id_product}`}>
                            <Box sx={{ width: "40px", height: "40px" }}>
                              <img src={row.image} alt={row.name} style={{ width: "100%", objectFit: "cover", height: "100%" }} />
                            </Box>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link to={`/products/${row.id_product}`}>
                            {row.name}
                          </Link>
                        </TableCell>
                        <TableCell>{row.count}</TableCell>
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

export default ProductTopSelling