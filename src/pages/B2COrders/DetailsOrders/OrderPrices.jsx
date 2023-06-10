import Box from "@mui/material/Box";
import { currencyFormat } from "../../../helpers/functions";

import styles from "./B2COrdersDetails.module.scss";

const OrderPrices = ({ total_with_out_vat, total_delivery, total_discount, total_promo_code, total_vat, total_with_vat, total, currency }) => {
  currency = currency == null ? "" : currency;
  return (
    <Box>
      <hr />
      <Box className={styles.priceRow}>
        <span>Ukupna osnovica za PDV:</span>
        <span className={styles.priceValue}>{`${currencyFormat(total_with_out_vat)} ${currency}`}</span>
      </Box>
      <Box className={styles.priceRow}>
        <span>Ukupan PDV:</span>
        <span className={styles.priceValue}>{`${currencyFormat(total_vat)} ${currency}`}</span>
      </Box>
      <Box className={styles.priceRow}>
        <span>Ukupan iznos:</span>
        <span className={styles.priceValue}>{`${currencyFormat(total_with_vat)} ${currency}`}</span>
      </Box>
      <Box className={styles.priceRow}>
        <span>Popust:</span>
        <span className={styles.priceValue}>{`-${currencyFormat(total_discount)} ${currency}`}</span>
      </Box>
      <Box className={styles.priceRow}>
        <span>Promo kod:</span>
        <span className={styles.priceValue}>{`-${currencyFormat(total_promo_code)} ${currency}`}</span>
      </Box>
      <Box className={styles.priceRow}>
        <span>Iznos dostave:</span>
        <span className={styles.priceValue}>{`${currencyFormat(total_delivery)} ${currency}`}</span>
      </Box>
      <hr />
      <Box className={`${styles.totalPriceRow} ${styles.priceRow}`}>
        <span>Ukupno za uplatu:</span>
        <span className={styles.priceValue}>{`${currencyFormat(total)} ${currency}`}</span>
      </Box>
    </Box>
  );
};

export default OrderPrices;
