import ActionField from "./ActionField/ActionField";
import moment from "moment";
import { Icon } from "@mui/material";

export const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const displayData = (value, input_type) => {
  switch (input_type) {
    case "boolean":
      return value ? <Icon>check</Icon> : <Icon>close</Icon>;
    case "date_format":
      return (
        <>
          {moment(value).isValid()
            ? moment(value).format("DD. MMM yyyy HH:mm A")
            : ""}
        </>
      );
    case "image":
      return <img src={value} height="70px" />;
    case "input":
    default:
      return value;
  }
};
