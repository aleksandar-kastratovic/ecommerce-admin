import Unicon from "../components/shared/Unicon/Unicon";
import IconList from "./icons";
import moment from "moment";
import Icon from "@mui/material/Icon";
import { Padding } from "@mui/icons-material";

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
            return (
                <div style={{ height: "30px", width: "30px", display: "flex", alignItems: "center" }}>
                    {value ? <img src={value} style={{ objectFit: "cover", height: "30px", width: "100%" }} alt="Slika" /> : <Icon sx={{ color: "#b3b3b3" }}>no_photography</Icon>}
                </div>
            );

        case "multiple_images":
            if (column === "input") {
                const arrParsed = JSON.parse(value);
                return (
                    <div style={{ height: "30px", width: "30px", display: "flex", alignItems: "center" }}>
                        {arrParsed.length > 0 ? (
                            arrParsed.map((item) => {
                                // return <img key={item.id} src={item.file} style={{ marginRight: "0.3rem", height: "100%", width: "100%", objectFit: "cover" }} alt="Slika" />;
                                return (
                                    <div key={item.id} style={{ height: "100%", width: "30px", display: "flex", alignItems: "center", marginRight: "0.3rem" }}>
                                        <img src={item.file} style={{ height: "100%", width: "100%", objectFit: "cover" }} alt="Slika" />;
                                    </div>
                                );
                            })
                        ) : (
                            <Icon sx={{ color: "#b3b3b3" }}>no_photography</Icon>
                        )}
                    </div>
                );
            } else {
                return value;
            }
        case "gallery":
            // varijacije tabela
            if (column === "gallery") {
                return (
                    <div style={{ height: "30px", display: "flex", alignItems: "center" }}>
                        {value.length > 0 ? (
                            value.map((item) => {
                                // return <img key={item.id} src={item.file} style={{ marginRight: "0.3rem", height: "100%" }} alt="Slika" />;
                                return (
                                    <div key={item.id} style={{ height: "100%", width: "30px", marginRight: "0.3rem" }}>
                                        <img src={item.file} style={{ height: "100%", width: "100%", objectFit: "cover" }} alt="Slika" />
                                    </div>
                                );
                            })
                        ) : (
                            <Icon sx={{ color: "#b3b3b3" }}>no_photography</Icon>
                        )}
                    </div>
                );
            } else {
                return value;
            }
        case "input":
        default:
            if (value === "Vidljiv" || value === "on" || value === "Objavljen" || value === "Aktivno") {
                return <span style={{ backgroundColor: "#28a86e36", padding: "0.1rem 0.3rem", borderRadius: "0.2rem" }}>{value}</span>;
            } else if (value === "Nevidljiv" || value === "off" || value === "Blokiran" || value === "Neaktivno") {
                return <span style={{ backgroundColor: "#ff000024", padding: "0.1rem 0.3rem", borderRadius: "0.2rem" }}>{value}</span>;
            } else if (value === "Arhiviran" || value === "U izradi") {
                return <span style={{ backgroundColor: "#329beb36", padding: "0.1rem 0.3rem", borderRadius: "0.2rem" }}>{value}</span>;
            } else {
                return value;
            }
    }
};
