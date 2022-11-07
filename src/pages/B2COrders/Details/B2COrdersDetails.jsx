import { useNavigate, useParams } from "react-router-dom";
import PageWrapper from "../../../components/shared/Layout/PageWrapper/PageWrapper";
import useAPI from "../../../api/api";
import { useQuery } from "react-query";
import OrderSection from "./OrdersSection";
import { Box } from "@mui/material";
import addressTemplate from "../../../helpers/addressTemplate";
import OrderPrices from "./OrderPrices";

import styles from "./B2COrdersDetails.module.scss";
import tableFields from "./tableFields.json";
import OrderItemsTable from "./OrderItemsTable";
import OrderStatus from "./OrderStatus";

const B2COrdersDetails = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const api = useAPI();
    const apiPathOrderData = "admin/orders-b2b/order";
    const apiPathBilling = "admin/orders-b2b/billing-address";
    const apiPathShipping = "admin/orders-b2b/shipping-address";
    const apiPathItems = "admin/orders-b2b/items";

    const { isLoading: isOrderLoading, data: orderData } = useQuery(["data"], () => api.get(`${apiPathOrderData}/${orderId}`).then((response) => response?.payload));
    const { isLoading: isBillingLoading, data: billingData } = useQuery(["billing"], () => api.list(`${apiPathBilling}/${orderId}`).then((response) => response?.payload?.items[0]));
    const { isLoading: isShipingLoading, data: shippingData } = useQuery(["shipping"], () => api.list(`${apiPathShipping}/${orderId}`).then((response) => response?.payload?.items[0]));
    const { isLoading: isItemsLoading, data: orderItems } = useQuery(["items"], () => api.list(`${apiPathItems}/${orderId}`).then((response) => response?.payload?.items));

    return (
        <PageWrapper
            title={"Porudžbina"}
            back={() => {
                navigate(-1);
            }}
            ready={!(isOrderLoading || isBillingLoading || isShipingLoading || isItemsLoading)}
        >
            <Box className={styles.orderData}>
                <OrderSection title="Podaci partnera:" className={styles.orderSection50}>
                    <Box className={styles.orderDataSection}>
                        <Box className={styles.orderDataDisplay}>
                            <p>
                                <span className={styles.dataLabel}>Kompanija:</span>
                                {billingData?.company_name}
                            </p>
                            <p>
                                <span className={styles.dataLabel}>Matični broj:</span>
                                {billingData?.maticni_broj}
                            </p>
                            <p>
                                <span className={styles.dataLabel}>PIB:</span>
                                {billingData?.pib}
                            </p>
                            <p>
                                <span className={styles.dataLabel}>Adresa:</span>
                                {addressTemplate(billingData?.address, billingData?.object_number, billingData?.floor, billingData?.apartment_number)}
                            </p>
                            <p>
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
                                {orderData?.payment_method}
                            </p>
                            <p>
                                <span className={styles.dataLabel}> Način dostave:</span>
                                {orderData?.delivery_method}
                            </p>
                            <p>
                                <span className={styles.dataLabel}>Poručilac:</span>
                                {orderData?.ship_to_name}
                            </p>
                        </Box>
                    </Box>
                    {shippingData?.note && (
                        <p>
                            <span className={styles.dataLabel}>Napomena:</span>
                            {shippingData?.note}
                        </p>
                    )}
                </OrderSection>
            </Box>
            <OrderSection title="Status porudžbine:" className={styles.orderSection50}>
                <OrderStatus orderId={orderData?.id} status={orderData?.status} />
            </OrderSection>
            <OrderSection title="Proizvodi u porudžbini:">
                <OrderItemsTable fields={tableFields} items={orderItems} />
            </OrderSection>
            <OrderSection title="Porudžbina:">
                <OrderPrices
                    total_with_out_vat={orderData?.total_with_out_vat}
                    total_delivery={orderData?.total_delivery}
                    total_discount={orderData?.total_discount}
                    total_promo_code={orderData?.total_promo_code}
                    total_rabat_1={orderData?.total_rabat_1}
                    total_rabat_2={orderData?.total_rabat_2}
                    total_vat={orderData?.total_vat}
                    total_with_vat={orderData?.total_with_vat}
                    total={orderData?.total}
                    currency={orderData?.currency}
                />
            </OrderSection>
        </PageWrapper>
    );
};

export default B2COrdersDetails;
