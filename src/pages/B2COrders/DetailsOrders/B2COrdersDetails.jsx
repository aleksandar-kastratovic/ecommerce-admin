import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";

import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import PageWrapper from "../../../components/shared/Layout/PageWrapper/PageWrapper";
import addressTemplate from "../../../helpers/addressTemplate";
import OrderSection from "./OrdersSection";
import OrderPrices from "./OrderPrices";
import tableFields from "./tableFields.json";
import OrderItemsTable from "./OrderItemsTable";
import OrderStatus from "./OrderStatus";

import styles from "./B2COrdersDetails.module.scss";
import { useContext } from "react";
import AuthContext from "../../../store/auth-contex";


const B2COrdersDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const authCtx = useContext(AuthContext);
  const { api } = authCtx;
  const apiPathOrderData = "admin/orders-b2c/summary";
  const apiPathBilling = "admin/orders-b2c/billing-address";
  const apiPathShipping = "admin/orders-b2c/shipping-address";
  const apiPathItems = "admin/orders-b2c/items";

  const { isLoading: isOrderLoading, data: orderData } = useQuery(["data"], () => api.get(`${apiPathOrderData}/${orderId}`).then((response) => response?.payload));
  const { isLoading: isBillingLoading, data: billingData } = useQuery(["billing"], () => api.list(`${apiPathBilling}/${orderId}`).then((response) => response?.payload?.items[0]));
  const { isLoading: isShipingLoading, data: shippingData } = useQuery(["shipping"], () => api.list(`${apiPathShipping}/${orderId}`).then((response) => response?.payload?.items[0]));
  const { isLoading: isItemsLoading, data: orderItems } = useQuery(["items"], () => api.list(`${apiPathItems}/${orderId}`).then((response) => response?.payload?.items));


  return (
    <PageWrapper
      title={`Narudžbenica: ${orderData?.slug}`}
      back={() => {
        navigate(-1);
      }}
      ready={!(isOrderLoading || isBillingLoading || isShipingLoading || isItemsLoading)}
    >
      <Box
        className={styles.orderData}
        sx={{
          marginBottom: "1rem", "@media (max-width: 1536px)": { flexDirection: "column", },
        }}
      >
        <OrderSection title="Podaci kupca:" className={styles.orderSection50}>
          <Box className={styles.orderDataSection}>
            <Box className={styles.orderDataDisplay}>
              <p style={{ fontSize: "0.875rem" }}>
                <span className={styles.dataLabel}>Kupac:</span>
                {orderData?.bill_to_name ? orderData?.bill_to_name : "/"}
              </p>
              <p style={{ fontSize: "0.875rem" }}>
                <span className={styles.dataLabel}>Adresa:</span>
                {addressTemplate(billingData?.address, billingData?.object_number, billingData?.floor, billingData?.apartment_number, billingData?.zip_code, billingData?.town_name, billingData?.country_name)}
              </p>
              <p style={{ fontSize: "0.875rem" }}>
                <span className={styles.dataLabel}>Telefon:</span>
                {billingData?.phone ? billingData?.phone : "/"}
              </p>
              <p style={{ fontSize: "0.875rem" }}>
                <span className={styles.dataLabel}>Email:</span>
                {billingData?.email ? billingData?.email : "/"}
              </p>
            </Box>
            <Box className={styles.orderDataDisplay}>

              <p style={{ fontSize: "0.875rem" }}>
                <span className={styles.dataLabel}>Plaćanje:</span>
                <Tooltip
                  placement='top'
                  arrow={true}
                  title={
                    <Box>
                      <Typography>Banka: {orderData?.payment_method_status?.bank_name}</Typography>
                      <Typography>Autorizacioni kod: {orderData?.payment_method_status?.auth_code}</Typography>
                      <Typography>Status transakcije: {orderData?.payment_method_status?.payment_status}</Typography>
                      <Typography>Kod statusa transakcije: {orderData?.payment_method_status?.transaction_status_code}</Typography>
                      <Typography>Datum transakcije: {orderData?.payment_method_status?.transaction_date}</Typography>
                      <Typography>Statusni kod 3D transakcije: {orderData?.payment_method_status?.status_code_3D_transaction}</Typography>
                    </Box>
                  } >
                  <span style={{
                    cursor: "pointer",
                    fontWeight: "600",
                    color: orderData?.payment_method && orderData?.payment_method.startsWith("credit_card_") ?
                      (
                        orderData?.payment_method_status.status_info === "danger" ? "#d32f2f" :
                          orderData?.payment_method_status.status_info === "success" ? "#28a86e" :
                            orderData?.payment_method_status.status_info === "warning" ? "#FFCC00" :
                              "black" // Default color
                      )
                      : "black" // Default color if payment_method doesn't start with "credit_card_"
                  }}>
                    {orderData?.payment_method_name ? orderData?.payment_method_name : "/"}
                  </span>
                </Tooltip>
              </p>
              <p style={{ fontSize: "0.875rem" }}>
                <span className={styles.dataLabel}>Dostava:</span>
                {orderData?.delivery_method_name ? orderData?.delivery_method_name : "/"}
              </p>
              <p style={{ fontSize: "0.875rem" }}>
                <span className={styles.dataLabel}>Vreme kupovine:</span>
                {orderData?.created_at ? orderData?.created_at : "/"}
              </p>
              <p style={{ fontSize: "0.875rem" }}>
                <span className={styles.dataLabel}>Napomena:</span>
                {billingData?.note ? billingData?.note : "/"}
              </p>
            </Box>
          </Box>
        </OrderSection>
        <OrderSection title="Status narudžbenice:" className={styles.orderSection50}>
          <OrderStatus orderId={orderData?.id} status={orderData?.status} />
        </OrderSection>
      </Box >

      <Box
        sx={{ display: "grid", gridTemplateColumns: "78% auto", gap: "2rem", "@media (max-width: 1536px)": { gridTemplateColumns: "1fr" }, }}
      >
        <OrderSection title="Proizvodi u narudžbenici:" styleBodyProductOrders={{ paddingTop: "0.5rem", overflowX: "auto" }} styleWrapperOfOrderSection={{ maxWidth: "100%", overflowX: "hidden" }} >
          <OrderItemsTable fields={tableFields} items={orderItems} />
        </OrderSection>
        <OrderSection title="Ukupno za naplatu:" styleBodyProductOrders={{ padding: "0" }}>
          <OrderPrices
            total_with_out_vat={orderData?.total_with_out_vat}
            total_delivery_amount={orderData?.total_delivery_amount}
            total_discount={orderData?.total_discount}
            total_promo_code={orderData?.total_promo_code}
            total_vat={orderData?.total_vat}
            total_with_vat={orderData?.total_with_vat}
            total={orderData?.total}
            currency={orderData?.currency}
            total_items_discount_amount={orderData?.total_items_discount_amount}
            total_cart_discount_amount={orderData?.total_cart_discount_amount}
            total_promo_code_amount={orderData?.total_promo_code_amount}
          />
        </OrderSection>
      </Box>

    </PageWrapper >
  );
};

export default B2COrdersDetails;
