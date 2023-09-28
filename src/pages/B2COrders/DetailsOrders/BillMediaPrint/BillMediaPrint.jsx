import Box from "@mui/material/Box";
import addressTemplate from "../../../../helpers/addressTemplate";
import styles from "../B2COrdersDetails.module.scss";

const BillMediaPrint = ({ orderData, billingData }) => {
  return (
    <Box
      sx={{
        display: "none",
        "@media print": {
          display: "flex",
          gap: "1rem",
        },
      }}
    >
      <Box className={styles.orderDataDisplay}>
        <p>
          <span className={styles.dataLabel}>Kupac:</span>
          {orderData?.bill_to_name ? orderData?.bill_to_name : "/"}
        </p>
        <p>
          <span className={styles.dataLabel}>Adresa:</span>
          {addressTemplate(billingData?.address, billingData?.object_number, billingData?.floor, billingData?.apartment_number, billingData?.zip_code, billingData?.town_name, billingData?.country_name)}
        </p>
        <p>
          <span className={styles.dataLabel}>Telefon:</span>
          {billingData?.phone ? billingData?.phone : "/"}
        </p>
        <p>
          <span className={styles.dataLabel}>Email:</span>
          {billingData?.email ? billingData?.email : "/"}
        </p>
      </Box>
      <Box className={styles.orderDataDisplay}>
        <p>
          <span className={styles.dataLabel}>Plaćanje:</span>
          {orderData?.payment_method_name ? orderData?.payment_method_name : "/"}
        </p>
        <p>
          <span className={styles.dataLabel}>Dostava:</span>
          {orderData?.delivery_method_name ? orderData?.delivery_method_name : "/"}
        </p>
        <p>
          <span className={styles.dataLabel}>Vreme kupovine:</span>
          {orderData?.created_at ? orderData?.created_at : "/"}
        </p>
        <p>
          <span className={styles.dataLabel}>Napomena:</span>
          {billingData?.note ? billingData?.note : "/"}
        </p>
      </Box>
    </Box>
  )
}

export default BillMediaPrint