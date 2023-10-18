import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

// import logo from "../../assets/images/croonus-sidebar-logo-dark.svg";

import AuthContext from "../../store/auth-contex";
import "../../../src/variables.scss"
import Box from "@mui/material/Box";

import B2CLifetimeRevenue from "./B2CDashboard/LifetimeRevenue/LifetimeRevenue";
import B2CAverageRevenue from "./B2CDashboard/AverageRevenue/AverageRevenue";
import B2CTotalCustomers from "./B2CDashboard/TotalCustomers/TotalCustomers";
import B2CStatus from "./B2CDashboard/Status/Status";
import B2CRecentOverview from "./B2CDashboard/RecentOverview/RecentOverview";
import B2CProductTopSelling from "./B2CDashboard/ProductTopSelling/ProductTopSelling";
import B2CTopBuyer from "./B2CDashboard/TopBuyer/TopBuyer";
import B2CChartTabs from "./B2CDashboard/ChartTabs/ChartTabs";
import B2CSearchTerms from "./B2CDashboard/SearchTerms/SearchTerms";

import B2BLifetimeRevenue from "./B2BDashboard/LifetimeRevenue/LifetimeRevenue";
import B2BAverageRevenue from "./B2BDashboard/AverageRevenue/AverageRevenue";
import B2BTotalCustomers from "./B2BDashboard/TotalCustomers/TotalCustomers";
import B2BStatus from "./B2BDashboard/Status/Status";
import B2BRecentOverview from "./B2BDashboard/RecentOverview/RecentOverview";
import B2BProductTopSelling from "./B2BDashboard/ProductTopSelling/ProductTopSelling";
import B2BTopBuyer from "./B2BDashboard/TopBuyer/TopBuyer";
import B2BChartTabs from "./B2BDashboard/ChartTabs/ChartTabs";
import B2BSearchTerms from "./B2BDashboard/SearchTerms/SearchTerms";
import { InputSelect } from "../../components/shared/Form/FormInputs/FormInputs";
import DashboardSkeleton from "../../components/shared/Loading/DashboardSkeleton";


const Homepage = () => {

  const authCtx = useContext(AuthContext);
  const { api } = authCtx;
  const [valueSystem, setValueSystem] = useState(null);
  const [options, setOptions] = useState([]);
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(false);
  // B2C
  const B2CorderLifetimeRevenue = "admin/dashboard/b2c/order-lifetime-revenue";
  const B2CorderAverageRevenue = "admin/dashboard/b2c/order-average-revenue";
  const B2CtotalCustomers = "admin/dashboard/b2c/customers-count";
  const B2CorderStatusCount = "admin/dashboard/b2c/order-status-count";
  const B2CorderRecentOverview = "admin/dashboard/b2c/order-recent-overview";

  const B2CproductItemTopSelling = "admin/dashboard/b2c/product-item-top-selling";
  const B2CproductItemActiveCount = "admin/dashboard/b2c/product-item-active-count";
  const B2CproductItemLowStockCount = "admin/dashboard/b2c/product-item-low-stock-count";
  const B2CcustomersTopBuyer = "admin/dashboard/b2c/customers-top-buyer";
  const B2CcustomersGuestOrderedPercentage = "admin/dashboard/b2c/customers-guest-ordered-percentage";
  const B2CcustomersNeverOrderedPercentage = "admin/dashboard/b2c/customers-never-ordered-percentage";
  const B2CcustomersSingleOrderPercentage = "admin/dashboard/b2c/customers-single-order-percentage";

  // B2B
  const B2BorderLifetimeRevenue = "admin/dashboard/b2b/order-lifetime-revenue";
  const B2BorderAverageRevenue = "admin/dashboard/b2b/order-average-revenue";
  const B2BtotalCustomers = "admin/dashboard/b2b/customers-count";
  const B2BorderStatusCount = "admin/dashboard/b2b/order-status-count";
  const B2BorderRecentOverview = "admin/dashboard/b2b/order-recent-overview";

  const B2BproductItemTopSelling = "admin/dashboard/b2b/product-item-top-selling";
  const B2BproductItemActiveCount = "admin/dashboard/b2b/product-item-active-count";
  const B2BproductItemLowStockCount = "admin/dashboard/b2b/product-item-low-stock-count";
  const B2BcustomersTopBuyer = "admin/dashboard/b2b/customers-top-buyer";
  const B2BcustomersNeverOrderedPercentage = "admin/dashboard/b2b/customers-never-ordered-percentage";
  const B2BcustomersSingleOrderPercentage = "admin/dashboard/b2b/customers-single-order-percentage";

  //Order B2C
  const { data: lifetimeRevenueB2C } = useQuery(["lifetimeRevenueB2C"], () => api.get(`${B2CorderLifetimeRevenue}`).then((response) => response?.payload));
  const { data: averageRevenueB2C } = useQuery(["averageRevenueB2C"], () => api.get(`${B2CorderAverageRevenue}`).then((response) => response?.payload));
  const { data: totalCustomersDataB2C } = useQuery(["totalCustomersB2C"], () => api.get(`${B2CtotalCustomers}`).then((response) => response?.payload));
  const { data: statusCountB2C } = useQuery(["orderStatusCountB2C"], () => api.get(`${B2CorderStatusCount}`).then((response) => response?.payload));
  const { data: recentOverviewB2C } = useQuery(["recentOverviewB2C"], () => api.get(`${B2CorderRecentOverview}`).then((response) => response?.payload));

  //Product Top Selling B2C
  const { data: productTopSellingB2C } = useQuery(["productTopSellingB2C"], () => api.get(`${B2CproductItemTopSelling}`).then((response) => response?.payload));
  const { data: productActiveCountB2C } = useQuery(["productActiveCountB2C"], () => api.get(`${B2CproductItemActiveCount}`).then((response) => response?.payload));
  const { data: productLowStockCountB2C } = useQuery(["productLowStockCountB2C"], () => api.get(`${B2CproductItemLowStockCount}`).then((response) => response?.payload));

  //Top Buyer B2C
  const { data: cusTopBuyerB2C } = useQuery(["cusTopBuyerB2C"], () => api.get(`${B2CcustomersTopBuyer}`).then((response) => response?.payload));
  const { data: cusGuestOrderedPercentageB2C } = useQuery(["cusGuestOrderedPercentageB2C"], () => api.get(`${B2CcustomersGuestOrderedPercentage}`).then((response) => response?.payload));
  const { data: cusNeverOrderedPercentageB2C } = useQuery(["cusNeverOrderedPercentageB2C"], () => api.get(`${B2CcustomersNeverOrderedPercentage}`).then((response) => response?.payload));
  const { data: cusSingleOrderPercentageB2C } = useQuery(["cusSingleOrderPercentageB2C"], () => api.get(`${B2CcustomersSingleOrderPercentage}`).then((response) => response?.payload));

  /*--------*/

  //Order B2B
  const { data: lifetimeRevenueB2B } = useQuery(["lifetimeRevenueB2B"], () => api.get(`${B2BorderLifetimeRevenue}`).then((response) => response?.payload));
  const { data: averageRevenueB2B } = useQuery(["averageRevenueB2B"], () => api.get(`${B2BorderAverageRevenue}`).then((response) => response?.payload));
  const { data: totalCustomersDataB2B } = useQuery(["totalCustomersB2B"], () => api.get(`${B2BtotalCustomers}`).then((response) => response?.payload));
  const { data: statusCountB2B } = useQuery(["orderStatusCountB2B"], () => api.get(`${B2BorderStatusCount}`).then((response) => response?.payload));
  const { data: recentOverviewB2B } = useQuery(["recentOverviewB2B"], () => api.get(`${B2BorderRecentOverview}`).then((response) => response?.payload));

  //Product Top Selling B2B
  const { data: productTopSellingB2B } = useQuery(["productTopSellingB2B"], () => api.get(`${B2BproductItemTopSelling}`).then((response) => response?.payload));
  const { data: productActiveCountB2B } = useQuery(["productActiveCountB2B"], () => api.get(`${B2BproductItemActiveCount}`).then((response) => response?.payload));
  const { data: productLowStockCountB2B } = useQuery(["productLowStockCountB2B"], () => api.get(`${B2BproductItemLowStockCount}`).then((response) => response?.payload));

  //Top Buyer B2B
  const { data: cusTopBuyerB2B } = useQuery(["cusTopBuyerB2B"], () => api.get(`${B2BcustomersTopBuyer}`).then((response) => response?.payload));
  const { data: cusNeverOrderedPercentageB2B } = useQuery(["cusNeverOrderedPercentageB2B"], () => api.get(`${B2BcustomersNeverOrderedPercentage}`).then((response) => response?.payload));
  const { data: cusSingleOrderPercentageB2B } = useQuery(["cusSingleOrderPercentageB2B"], () => api.get(`${B2BcustomersSingleOrderPercentage}`).then((response) => response?.payload));

  const onChangeSystem = (res) => {
    setValueSystem(res.target.value)
  }

  useEffect(() => {
    const fetchOptions = () => {
      setIsLoadingSkeleton(true);
      api.get(`admin/dashboard/options/ddl/system`)
        .then((response) => {
          setOptions(response?.payload);
          setIsLoadingSkeleton(false);
        })
        .catch((error) => {
          console.warn(error);
          setIsLoadingSkeleton(false);
        });
    };

    fetchOptions();

    if (options.length > 0) {
      setValueSystem(options[0]?.id);
    }
  }, [options.length]);

  return (
    <>

      {isLoadingSkeleton ?
        <DashboardSkeleton /> :
        <>
          <InputSelect
            label="Izaberite deo sistema"
            styleFormControl={{ width: "15rem", ".MuiFormLabel-root": { fontSize: "0.875rem" } }}
            usePropName={false}
            fillFromApi="admin/dashboard/options/ddl/system"
            options={[{}]}
            onChange={(res) => onChangeSystem(res)}
            value={valueSystem}
          />

          {valueSystem === 'b2c' && (
            <>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "0.5rem", "@media (max-width: 1200px)": { gridTemplateColumns: "1fr" } }}>
                <B2CLifetimeRevenue lifetimeRevenueB2C={lifetimeRevenueB2C} />
                <B2CAverageRevenue averageRevenueB2C={averageRevenueB2C} />
                <B2CTotalCustomers totalCustomersDataB2C={totalCustomersDataB2C} />
                <B2CStatus statusCountB2C={statusCountB2C} />
              </Box>

              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "1rem" }}>
                <B2CChartTabs />
                <B2CRecentOverview recentOverviewB2C={recentOverviewB2C} />
              </Box>

              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "1rem" }}>
                <B2CProductTopSelling productTopSellingB2C={productTopSellingB2C} productActiveCountB2C={productActiveCountB2C} productLowStockCountB2C={productLowStockCountB2C} />
                <B2CTopBuyer cusTopBuyerB2C={cusTopBuyerB2C} cusGuestOrderedPercentageB2C={cusGuestOrderedPercentageB2C} cusNeverOrderedPercentageB2C={cusNeverOrderedPercentageB2C} cusSingleOrderPercentageB2C={cusSingleOrderPercentageB2C} />
                <B2CSearchTerms />
              </Box>
            </>
          )}

          {valueSystem === 'b2b' && (
            <>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "0.5rem", "@media (max-width: 1200px)": { gridTemplateColumns: "1fr" } }}>
                <B2BLifetimeRevenue lifetimeRevenueB2B={lifetimeRevenueB2B} />
                <B2BAverageRevenue averageRevenueB2B={averageRevenueB2B} />
                <B2BTotalCustomers totalCustomersDataB2B={totalCustomersDataB2B} />
                <B2BStatus statusCountB2B={statusCountB2B} />
              </Box>

              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "1rem" }}>
                <B2BChartTabs />
                <B2BRecentOverview recentOverviewB2B={recentOverviewB2B} />
              </Box>

              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "1rem" }}>
                <B2BProductTopSelling productTopSellingB2B={productTopSellingB2B} productActiveCountB2B={productActiveCountB2B} productLowStockCountB2B={productLowStockCountB2B} />
                <B2BTopBuyer cusTopBuyerB2B={cusTopBuyerB2B} cusNeverOrderedPercentageB2B={cusNeverOrderedPercentageB2B} cusSingleOrderPercentageB2B={cusSingleOrderPercentageB2B} />
                <B2BSearchTerms />
              </Box>
            </>
          )}
        </>}

    </>
  )
}

export default Homepage
