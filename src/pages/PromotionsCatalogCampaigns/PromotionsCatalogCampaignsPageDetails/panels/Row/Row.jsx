import { Icon, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import style from "./Row.module.scss";
import { InputSelect } from "../../../../../components/shared/Form/FormInputs/FormInputs";
import InputValue from "../InputValue/InputValue";

const Row = ({ data, id, handleRemoveComponent }) => {

  const apiPath = "admin/campaigns-product-catalog/conditions";

  const [rowData, setRowData] = useState({ ...data, id });

  const [openDialog, setOpenDialog] = useState({ show: false });

  const [valueOptions, setValueOptions] = useState({
    component
      :
      null,
    input_type
      :
      null
  });

  const selectedValues = rowData?.fields?.map((item) => item.selected.id).join(", ");

  const checkIfAllFieldsSelected = () => {
    const fields = rowData.fields;

    const allSelected = fields.every((field) => {
      if (field.field !== "value") {
        return field.selected.id !== null && field.selected.id !== 0;
      }
      return true;
    });

    if (allSelected) {
      setOpenDialog({ show: true });
    }
  };

  return (
    <div className={style.rowHolder}>
      {(rowData?.fields ?? []).map(((item, index) => {
        if (index > 0 && (rowData?.fields[index - 1]?.selected?.id == null || rowData?.fields[index - 1]?.selected?.id == 0)) {
          return null;
        }

        let queryString = "";
        for (let i = 0; i < rowData.fields.length; i++) {
          const selectedId = rowData.fields[i]?.selected?.id;

          if (i === 0) {
            queryString += `${rowData.fields[i].field}=${selectedId ?? ''}`;
          } else {
            queryString += `&${rowData.fields[i].field}=${selectedId ?? ''}`;
          }
        }

        if (item.field !== "value") {
          return <InputSelect
            className={style.inputSelect}
            key={item.field + queryString}
            required={false}
            name={item.field}
            fillFromApi={`${apiPath}/row/ddl`}
            usePropName={true}
            queryString={queryString}
            value={item.selected.id ?? 0}
            onChange={({ target }, { props }) => {
              if (item.field === "condition" && props.props != null) {
                setValueOptions(props.props)
              }
              let tmp = { ...rowData };
              tmp.fields[index].selected.id = target.value;
              for (let i = index + 1; i < tmp.fields.length; i++) {
                tmp.fields[i].selected.id = null;
              }
              setRowData(tmp);
              checkIfAllFieldsSelected();
            }}
          />
        } else {
          return <InputValue key={item.field + queryString} selectedValues={selectedValues} setOpenDialog={setOpenDialog} openDialog={openDialog} fillFromApi={`${apiPath}/row/ddl`}
            queryString={queryString} usePropName={true} name={item.field} component={valueOptions.component} inputType={valueOptions.input_type} />
        }

      }))}

      <Tooltip title={"Obrišite uslov za akciju"} placement="top" arrow>
        <IconButton
          className={style.removeRow}
          onClick={() => {
            handleRemoveComponent(id, "row");
          }}>
          <Icon>delete</Icon>
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Row;
