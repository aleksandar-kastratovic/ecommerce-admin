import { useContext } from "react";
import { useQuery } from "react-query";

// import logo from "../../assets/images/croonus-sidebar-logo-dark.svg";

import AuthContext from "../../store/auth-contex";
import "../../../src/variables.scss"

import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import PaymentsIcon from '@mui/icons-material/Payments';

import LifetimeRevenue from "./LifetimeRevenue/LifetimeRevenue";
import AverageRevenue from "./AverageRevenue/AverageRevenue";
import TotalCustomers from "./TotalCustomers/TotalCustomers";
import Status from "./Status/Status";
import RecentOverview from "./RecentOverview/RecentOverview";
import ProductTopSelling from "./ProductTopSelling/ProductTopSelling";
import TopBuyer from "./TopBuyer/TopBuyer";
import ChartTabs from "./ChartTabs/ChartTabs";
import SearchTerms from "./SearchTerms/SearchTerms";


const Homepage = () => {

  const authCtx = useContext(AuthContext);
  const { api } = authCtx;
  const orderLifetimeRevenue = "admin/dashboard/b2c/order-lifetime-revenue";
  const orderAverageRevenue = "admin/dashboard/b2c/order-average-revenue";
  const totalCustomers = "admin/dashboard/b2c/customers-count";
  const orderStatusCount = "admin/dashboard/b2c/order-status-count";
  const orderRecentOverview = "admin/dashboard/b2c/order-recent-overview";
  const productItemTopSelling = "admin/dashboard/b2c/product-item-top-selling";
  const productItemActiveCount = "admin/dashboard/b2c/product-item-active-count";
  const productItemLowStockCount = "admin/dashboard/b2c/product-item-low-stock-count";
  const customersTopBuyer = "admin/dashboard/b2c/customers-top-buyer";
  const customersGuestOrderedPercentage = "admin/dashboard/b2c/customers-guest-ordered-percentage";
  const customersNeverOrderedPercentage = "admin/dashboard/b2c/customers-never-ordered-percentage";
  const customersSingleOrderPercentage = "admin/dashboard/b2c/customers-single-order-percentage";


  //Order
  const { data: lifetimeRevenue } = useQuery(["lifetimeRevenue"], () => api.get(`${orderLifetimeRevenue}`).then((response) => response?.payload));
  const { data: averageRevenue } = useQuery(["averageRevenue"], () => api.get(`${orderAverageRevenue}`).then((response) => response?.payload));
  const { data: totalCustomersData } = useQuery(["totalCustomers"], () => api.get(`${totalCustomers}`).then((response) => response?.payload));
  const { data: statusCount } = useQuery(["orderStatusCount"], () => api.get(`${orderStatusCount}`).then((response) => response?.payload));
  const { data: recentOverview } = useQuery(["recentOverview"], () => api.get(`${orderRecentOverview}`).then((response) => response?.payload));

  //Product Top Selling
  const { data: productTopSelling } = useQuery(["productTopSelling"], () => api.get(`${productItemTopSelling}`).then((response) => response?.payload));
  const { data: productActiveCount } = useQuery(["productActiveCount"], () => api.get(`${productItemActiveCount}`).then((response) => response?.payload));
  const { data: productLowStockCount } = useQuery(["productLowStockCount"], () => api.get(`${productItemLowStockCount}`).then((response) => response?.payload));

  //Top Buyer
  const { data: cusTopBuyer } = useQuery(["cusTopBuyer"], () => api.get(`${customersTopBuyer}`).then((response) => response?.payload));
  const { data: cusGuestOrderedPercentage } = useQuery(["cusGuestOrderedPercentage"], () => api.get(`${customersGuestOrderedPercentage}`).then((response) => response?.payload));
  const { data: cusNeverOrderedPercentage } = useQuery(["cusNeverOrderedPercentage"], () => api.get(`${customersNeverOrderedPercentage}`).then((response) => response?.payload));
  const { data: cusSingleOrderPercentage } = useQuery(["cusSingleOrderPercentage"], () => api.get(`${customersSingleOrderPercentage}`).then((response) => response?.payload));

  return (
    <>
      {/* <Paper elevation={0} sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "2rem" }}>
        <Typography variant="h6">
          {authCtx.user?.user?.first_name + " " + authCtx.user?.user?.last_name}, dobrodošli na Croonus CMS.
        </Typography>
      </Paper> */}

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        <LifetimeRevenue lifetimeRevenue={lifetimeRevenue} />
        <AverageRevenue averageRevenue={averageRevenue} />
        <TotalCustomers totalCustomersData={totalCustomersData} />
        <Status statusCount={statusCount} />
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginTop: "1rem" }}>
        <ChartTabs />
        <RecentOverview recentOverview={recentOverview} />
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "1rem" }}>
        <ProductTopSelling productTopSelling={productTopSelling} productActiveCount={productActiveCount} productLowStockCount={productLowStockCount} />
        <TopBuyer cusTopBuyer={cusTopBuyer} cusGuestOrderedPercentage={cusGuestOrderedPercentage} cusNeverOrderedPercentage={cusNeverOrderedPercentage} cusSingleOrderPercentage={cusSingleOrderPercentage} />
        <SearchTerms />
      </Box>
    </>
  )
}

export default Homepage
