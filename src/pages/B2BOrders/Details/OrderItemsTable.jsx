import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { currencyFormat } from "../../../helpers/functions";

import styles from "./B2BOrdersDetails.module.scss";


const OrderItemsTable = ({ items, fields }) => {
  const getField = (type, value) => {
    switch (type) {
      case "image":
        return <img src={value} alt={value} />;
      case "currency":
        return currencyFormat(value);
      default:
        return value;
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {fields.map((field) => (
            <TableCell key={field.prop_name}>{field.field_name}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.item.id}>
            {fields.map((field) => {
              let value = null;
              if (item.item != null && item.item.hasOwnProperty(field.prop_name)) {
                value = item.item[field.prop_name];
              } else if (item.price != null && item.price.hasOwnProperty(field.prop_name)) {
                value = item.price[field.prop_name];
              } else {
                value = null;
              }
              return (
                <TableCell key={field.prop_name} className={styles.productCell}>
                  <Link to={`/products/${item.item.id_product}`} className={styles.productCellLink}>
                    {getField(field.input_type, value)}
                  </Link>
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderItemsTable;
