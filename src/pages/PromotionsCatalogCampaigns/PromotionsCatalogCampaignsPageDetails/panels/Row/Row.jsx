import { Icon, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import style from './Row.module.scss';
import { InputSelect } from '../../../../../components/shared/Form/FormInputs/FormInputs';
import InputValue from '../InputValue/InputValue';

const Row = ({ data, id, handleRemoveComponent }) => {
  const apiPath = 'admin/campaigns-product-catalog/conditions';

  const [rowData, setRowData] = useState(data);
  const [openDialog, setOpenDialog] = useState({ show: false });
  const [valueOptions, setValueOptions] = useState(rowData.fields.find((item) => item.field === "condition")?.selected?.props ?? {
    component: null,
    input_type: null,
  });

  const checkIfAllFieldsSelected = () => {
    const fields = rowData.fields;

    const allSelected = fields.every((field) => {
      if (field.field !== 'value') {
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
      {(rowData?.fields ?? []).map((item, index) => {
        if (
          index > 0 &&
          (rowData?.fields[index - 1]?.selected?.id == null ||
            rowData?.fields[index - 1]?.selected?.id == 0)
        ) {
          return null;
        }

        let queryString = '';
        for (let i = 0; i < rowData.fields.length; i++) {
          const selectedId = rowData.fields[i]?.selected?.id;

          if (i === 0) {
            queryString += `${rowData.fields[i].field}=${selectedId ?? ''}`;
          } else {
            queryString += `&${rowData.fields[i].field}=${selectedId ?? ''}`;
          }
        }

        if (item.field !== 'value') {
          return (
            <InputSelect
              className={style.inputSelect}
              key={item.field + queryString}
              required={false}
              name={item.field}
              fillFromApi={`${apiPath}/row/ddl`}
              usePropName={true}
              queryString={queryString}
              value={item?.selected?.id ?? 0}
              onChange={({ target }, { props }) => {
                if (item.field === 'condition' && props.props != null) {
                  setValueOptions(props.props);
                }
                let tmp = { ...rowData };
                tmp.fields[index].selected.id = target.value;
                tmp.fields[index].selected.name = props.valuename;
                if (item.field === 'condition' && props.props != null) {
                  tmp.fields[index].selected.props = props.props;
                }
                for (let i = index + 1; i < tmp.fields.length; i++) {
                  tmp.fields[i].selected = { id: null, name: null };
                  if (tmp.fields[i].field === "value")
                    tmp.fields[i].selected = null;

                }
                setRowData(tmp);
                checkIfAllFieldsSelected();
              }}
            />
          );
        } else {
          return (
            <InputValue
              key={item.field + queryString}
              selectedValues={item.selected}
              setOpenDialog={setOpenDialog}
              openDialog={openDialog}
              fillFromApi={`${apiPath}/row/ddl`}
              queryString={queryString}
              usePropName={true}
              name={item.field}
              component={valueOptions.component}
              inputType={valueOptions.input_type}
              onChange={(selected) => {
                let tmp = { ...rowData };
                tmp.fields[index].selected = selected;
                setRowData(tmp);
              }}
            />
          );
        }
      })}

      <Tooltip title={'Obrišite uslov za akciju'} placement="top" arrow>
        <IconButton
          className={style.removeRow}
          onClick={() => {
            handleRemoveComponent(id, 'row');
          }}
        >
          <Icon>delete</Icon>
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Row;
