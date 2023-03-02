import { Icon, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
// import useAPI from "../../../../../api/api";
import style from "./Row.module.scss";
import { InputInput, InputSelect } from "../../../../../components/shared/Form/FormInputs/FormInputs";
import SelectionModal from "../SelectionModal/SelectionModal";

const Row = ({ data, id, handleRemoveComponent }) => {

  const apiPath = "admin/campaigns-product-catalog/conditions";

  const [rowData, setRowData] = useState({ ...data, id });

  const [openDialog, setOpenDialog] = useState({ show: false });

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
    <>
      <div className={style.rowHolder}>
        {/* {id} */}
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
              key={item.field + queryString}
              required={false}
              name={item.field}
              fillFromApi={`${apiPath}/row/ddl`}
              usePropName={true}
              queryString={queryString}
              value={item.selected.id ?? 0}
              onChange={({ target }) => {
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
            return <div className={style.valueIcon}>
              <InputInput value={selectedValues} readOnly />

              <Tooltip title={"Ukoliko želite da vidite sve selektovane vrednosti, kliknite ovde."} placement="top" arrow>
                <IconButton
                  className={style.showValues}
                  onClick={() => { setOpenDialog({ show: true }) }}
                >
                  <Icon>list</Icon>
                </IconButton>
              </Tooltip>
            </div>
          }

        }))}

        <Tooltip title={"Obrišite uslov za akciju"} placement="top" arrow>
          <IconButton
            className={style.removeRow}
            onClick={() => {
              handleRemoveComponent(id, "row_select");
            }}>
            <Icon>delete</Icon>
          </IconButton>
        </Tooltip>
      </div>
      <SelectionModal openDialog={openDialog} setOpenDialog={setOpenDialog} data={rowData} selectedValues={selectedValues} />
    </>
  );
};

export default Row;
