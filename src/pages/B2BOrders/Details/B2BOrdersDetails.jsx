import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useContext, useState } from "react";

import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import PageWrapper from "../../../components/shared/Layout/PageWrapper/PageWrapper";
import addressTemplate from "../../../helpers/addressTemplate";
import OrderSection from "./OrdersSection";
import OrderPrices from "./OrderPrices";
import OrderItemsTable from "./OrderItemsTable";
import OrderStatus from "./OrderStatus";
import AuthContext from "../../../store/auth-contex";

import tableFields from "./tableFields.json";

import styles from "./B2BOrdersDetails.module.scss";
import Button from "../../../components/shared/Button/Button";
import DeleteDialog from "../../../components/shared/Dialogs/DeleteDialog";
import Tooltip from "@mui/material/Tooltip";

const B2BOrdersDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const authCtx = useContext(AuthContext);
  const { api } = authCtx;
  const [showDialog, setShowDialog] = useState(false);
  const apiPathOrderData = "admin/orders-b2b/summary";
  const apiPathBilling = "admin/orders-b2b/billing-address";
  const apiPathShipping = "admin/orders-b2b/shipping-address";
  const apiPathItems = "admin/orders-b2b/items";

  const { isLoading: isOrderLoading, data: orderData } = useQuery(["data"], () => api.get(`${apiPathOrderData}/${orderId}`).then((response) => response?.payload));
  const { isLoading: isBillingLoading, data: billingData } = useQuery(["billing"], () => api.list(`${apiPathBilling}/${orderId}`).then((response) => response?.payload?.items[0]));
  const { isLoading: isShipingLoading, data: shippingData } = useQuery(["shipping"], () => api.list(`${apiPathShipping}/${orderId}`).then((response) => response?.payload?.items[0]));
  const { isLoading: isItemsLoading, data: orderItems } = useQuery(["items"], () =>
    api.list(`${apiPathItems}/${orderId}`).then((response) =>
      response?.payload?.items.map((itemName) => {

        if (itemName.item.attributes_text) {
          itemName.item.name += ` (${itemName.item.attributes_text})`;
        }
        return itemName;
      })

    ));

  return (
    <PageWrapper
      title={`Porudžbina: ${orderData?.slug}`}
      back={() => {
        navigate(-1);
      }}
      ready={!(isOrderLoading || isBillingLoading || isShipingLoading || isItemsLoading)}
    >
      <Box
        className={styles.orderData}
        sx={{
          marginBottom: "1rem", "@media (max-width: 1536px)": { flexDirection: "column", },
        }}>
        <OrderSection title="Podaci partnera:" className={styles.orderSection50}>
          <Box className={styles.orderDataSection}>
            <Box className={styles.orderDataDisplay}>
              <p style={{ fontSize: "0.875rem" }}>
                <span className={styles.dataLabel}>Kompanija:</span>
                {billingData?.company_name}
              </p>
              <p style={{ fontSize: "0.875rem" }}>
                <span className={styles.dataLabel}>Matični broj:</span>
                {billingData?.maticni_broj}
              </p>
              <p style={{ fontSize: "0.875rem" }}>
                <span className={styles.dataLabel}>PIB:</span>
                {billingData?.pib}
              </p>
              <p style={{ fontSize: "0.875rem" }}>
                <span className={styles.dataLabel}>Adresa:</span>
                {addressTemplate(billingData?.address, billingData?.object_number, billingData?.floor, billingData?.apartment_number)}
              </p>
              <p style={{ fontSize: "0.875rem" }}>
                <span className={styles.dataLabel}>Grad:</span>
                {billingData?.town_display_name ?? billingData?.town_name}
              </p>
            </Box>
            <Box className={styles.orderDataDisplay}>
              <p>
                <span className={styles.dataLabel}>Poštanski broj:</span>
                {billingData?.zip_code}
              </p>
              <p>
                <span className={styles.dataLabel}>Država:</span>
                {billingData?.country_name}
              </p>
              <p>
                <span className={styles.dataLabel}>Telefon:</span>
                {billingData?.phone}
              </p>
              <p>
                <span className={styles.dataLabel}>Mobilni telefon:</span>
                {billingData?.phone}
              </p>
              <p>
                <span className={styles.dataLabel}>E-mail:</span>
                {billingData?.email}
              </p>
            </Box>
          </Box>
          {billingData?.note && (
            <p>
              <span className={styles.dataLabel}>Napomena:</span>
              {billingData?.note}
            </p>
          )}
        </OrderSection>
        <OrderSection title="Adresa za dostavu:" className={styles.orderSection50}>
          <Box className={styles.orderDataSection}>
            <Box className={styles.orderDataDisplay}>
              <p>
                <span className={styles.dataLabel}>Adresa:</span>
                {addressTemplate(shippingData?.address, shippingData?.object_number, shippingData?.floor, shippingData?.apartment_number)}
              </p>
              <p>
                <span className={styles.dataLabel}>Grad:</span>
                {shippingData?.town_display_name ?? shippingData?.town_name}
              </p>
              <p>
                <span className={styles.dataLabel}>Poštanski broj:</span>
                {shippingData?.zip_code}
              </p>
              <p>
                <span className={styles.dataLabel}>Država:</span>
                {shippingData?.country_name}
              </p>
            </Box>
            <Box className={styles.orderDataDisplay}>
              <p>
                <span className={styles.dataLabel}>Način plaćanja:</span>
                {orderData?.payment_method_name}
              </p>
              <p>
                <span className={styles.dataLabel}> Način dostave:</span>
                {orderData?.delivery_method_name}
              </p>
              <p>
                <span className={styles.dataLabel}>Poručilac:</span>
                {orderData?.ship_to_name}
              </p>
              <p>
                <span className={styles.dataLabel}>Datum porudžbine:</span>
                {orderData?.created_at}
              </p>
            </Box>
          </Box>
          {shippingData?.note && (
            <p>
              <span className={styles.dataLabel}>Napomena:</span>
              {shippingData?.note}
            </p>
          )}
          {orderData?.note && (
            <p>
              <span className={styles.dataLabel}>Dodatna napomena:</span>
              {orderData?.note}
            </p>
          )}
        </OrderSection>
        <OrderSection title="Status porudžbine:" className={styles.orderSection50}>
          <OrderStatus orderId={orderData?.id} status={orderData?.status} />
        </OrderSection>
      </Box>
      <Box
        sx={{ display: "grid", gridTemplateColumns: "78% auto", gap: "2rem", "@media (max-width: 1536px)": { gridTemplateColumns: "1fr" }, }}
      >
        <OrderSection title="Proizvodi u porudžbini:" styleBodyProductOrders={{ paddingTop: "0.5rem", overflowX: "auto" }} styleWrapperOfOrderSection={{ maxWidth: "100%", overflowX: "hidden" }}>
          <OrderItemsTable fields={tableFields} items={orderItems} />
        </OrderSection>
        <OrderSection title="Porudžbina:" styleBodyProductOrders={{ padding: "0" }}>
          <OrderPrices
            total_original={orderData?.total_original}
            total_with_out_vat={orderData?.total_with_out_vat}
            total_delivery_amount={orderData?.total_delivery_amount}
            total_discount={orderData?.total_discount}
            total_promo_code={orderData?.total_promo_code}
            total_rabat_1={orderData?.total_rabat_1}
            total_rabat_2={orderData?.total_rabat_2}
            total_vat={orderData?.total_vat}
            total_with_vat={orderData?.total_with_vat}
            total={orderData?.total}
            currency={orderData?.currency}
          />
          <Tooltip title="Izbrišite narudžbenicu" arrow placement="top">
            <Box sx={{ width: "fit-content", marginLeft: "auto" }}>
              <Button
                onClick={() => {
                  setShowDialog(true);
                }}
                icon={"delete"}
                sx={{ border: "none", color: "var(--light-silver)", marginLeft: "auto", marginTop: "0.5rem", paddingRight: "0", display: "flex", minWidth: "auto !important", "&:hover": { border: "none", backgroundColor: "transparent" } }}
              />
            </Box>
          </Tooltip>

        </OrderSection>
      </Box>

      <DeleteDialog
        openDeleteDialog={{ show: showDialog }}
        setOpenDeleteDialog={() => setShowDialog(false)}
        handleConfirm={() => {
          api.delete(`admin/orders-b2b/list/${orderId}`)
            .then((response) => {
              navigate(-1);
              toast.success("Uspešno!");
            })
            .catch((error) => { console.log(error); toast.warning("Greška!"); });
          setShowDialog(false);
        }}
      />
    </PageWrapper>
  );
};

export default B2BOrdersDetails;
