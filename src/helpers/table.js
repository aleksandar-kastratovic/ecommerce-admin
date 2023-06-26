import Unicon from "../components/shared/Unicon/Unicon";
import IconList from "./icons";
import moment from "moment";

/** @return {int|string|null} The widht for the column. */
export const columnWidth = (column: FieldSpec) => {
    switch (column.prop_name) {
        case "action":
        case "order":
            return 120;

        case "name":
        case "title":
            return "*";
    }
    return null;
};

/** @return {string} The class name(s) for the column. */
export const columnClass = (column: FieldSpec) => {
    switch (column.prop_name) {
        case "order":
            return "list-page-table-align-center";
    }
    return "list-page-table-align-left";
};

/** @return {{}} The full properties for the column. */
export const columnProps = (column: FieldSpec, header: boolean = false) => {
    return {
        key: column.prop_name,
        width: columnWidth(column),
        className: (header ? "list-page-table-head" : "list-page-table-cell") + " " + columnClass(column),
        ...(column.table_props ?? {}),
    };
};

export const columnCell = (value, column, rowType) => {
    switch (rowType !== undefined ? rowType : column) {
        case "boolean":
            return value ? <Unicon icon={IconList.check} /> : <Unicon icon={IconList.close} />;

        case "date_format":
            return moment(value).isValid() ? moment(value).format("DD. MMM yyyy HH:mm A") : "";

        case "image":
        case "image_button":
            return <img src={value} height="50px" alt={true} />;

        case "multiple_images":
            if (column === "input") {
                const arrParsed = JSON.parse(value);
                return arrParsed.map((item) => {
                    return <img src={item.file} height="50px" style={{ marginRight: "2px" }} />;
                });
            } else {
                return value;
            }
        case "input":
        default:
            return value;
    }
};
