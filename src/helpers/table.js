import Unicon from "../components/shared/Unicon/Unicon";
import IconList from "./icons";
import moment from "moment";
import Icon from "@mui/material/Icon";

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
            return value ? <Unicon icon={IconList.check} styleIcon={{ color: "#28a86e" }} /> : <Unicon icon={IconList.close} styleIcon={{ color: "#D32F2E" }} />;

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
                    <div style={{ height: "30px", display: "flex", alignItems: "center" }}>
                        {arrParsed.length > 0 ? (
                            arrParsed.map((item) => {
                                return (
                                    <div key={item.id} style={{ height: "100%", width: "30px", display: "flex", alignItems: "center", marginRight: "0.3rem" }}>
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
        case "gallery":
            // varijacije tabela
            if (column === "gallery") {
                return (
                    <div style={{ height: "30px", display: "flex", alignItems: "center" }}>
                        {value.length > 0 ? (
                            value.map((item) => {
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
            if (value === "Vidljiv" || value === "on" || value === "Objavljen" || value === "Aktivno" || value === "Novo") {
                return <span style={{ backgroundColor: "#28a86e36", padding: "0.1rem 0.7rem", borderRadius: "0.6rem", color: "#28a86e", fontWeight: "500" }}>{value}</span>;
            } else if (value === "Nevidljiv" || value === "off" || value === "Blokiran" || value === "Neaktivno") {
                return <span style={{ backgroundColor: "#ff000024", padding: "0.1rem 0.7rem", borderRadius: "0.6rem", color: "#d32f2f", fontWeight: "500" }}>{value}</span>;
            } else if (value === "Arhiviran" || value === "U izradi") {
                return <span style={{ backgroundColor: "#17a2b93d", padding: "0.1rem 0.7rem", borderRadius: "0.6rem", color: "#17a2b9", fontWeight: "500" }}>{value}</span>;
            } else if (value === "Paket spreman za slanje") {
                return <span style={{ backgroundColor: "#feff7f6b", padding: "0.1rem 0.7rem", borderRadius: "0.6rem", color: "#a0a13291", fontWeight: "500" }}>{value}</span>;
            } else {
                return (
                    <span
                        style={{
                            overflow: "hidden",
                            lineHeight: "initial",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "3",
                            lineClamp: 3,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {value}
                    </span>
                );
            }
    }
};
