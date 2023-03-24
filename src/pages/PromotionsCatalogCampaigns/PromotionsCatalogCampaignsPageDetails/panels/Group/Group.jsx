import Button from "../../../../../components/shared/Button/Button";
import Buttons from "../../../../../components/shared/Form/Buttons/Buttons";
import { InputSelect } from "../../../../../components/shared/Form/FormInputs/FormInputs";
import { Box, Icon, IconButton, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import useAPI from "../../../../../api/api";
import style from "./Group.module.scss";


const Group = ({ id, data, rules, handleAddComponent, handleRemoveComponent }) => {

  const [dataGroup, setDataGroup] = useState({ ...data, id });

  const [fieldCondition, setFieldCondition] = useState(null);

  const [fieldValue, setFieldValue] = useState(null);

  const api = useAPI();
  const apiPath = "admin/campaigns-product-catalog/conditions";

  useEffect(() => {
    setFieldCondition(getValueField("condition"));
    setFieldValue(getValueField("value"));
  }, []);

  const getValueField = (find_field) => {
    let temp = dataGroup?.fields.find((item) => {
      return item.field === find_field;
    });

    if (temp) {
      return temp.selected.id;
    } else {
      return null;
    }
  };

  const setValueField = (find_field, selected_id, selected_name) => {
    const updatedDataGroup = { ...dataGroup };
    const field = updatedDataGroup.fields.find(item => item.field === find_field);
    field.selected.id = selected_id;
    field.selected.name = selected_name;
    setDataGroup(updatedDataGroup);
  };

  let isLastSelected = true;

  return (
    <div className={style.groupBox}>
      <Tooltip title={"Obrišite grupu"} placement="top" arrow>
        <IconButton
          className={style.removeGroup}
          onClick={() => {
            handleRemoveComponent(id, "group");
          }}>
          <Icon>delete</Icon>
        </IconButton>
      </Tooltip>

      <div className={style.groupHolder}>
        <Box className={"d-flex align-items-center"}>
          Ako su
          <span className={style.span}>
            <InputSelect className={style.inputConditionValue} label="" required={false} name="" fillFromApi={`${apiPath}/group/ddl/condition`} usePropName={false} value={fieldCondition} options={[]}
              onChange={({ target }, { props }) => {
                setFieldCondition(target.value);
                setValueField("condition", target.value, props.valuename);
              }}
            />
          </span>
          navedeni uslovi
          <span className={style.span}>
            <InputSelect className={style.inputConditionValue} label="" required={false} name="" fillFromApi={`${apiPath}/group/ddl/value`} usePropName={false} value={fieldValue} options={[]}
              onChange={({ target }, { props }) => {
                setFieldValue(target.value);
                setValueField("value", target.value, props.valuename);
              }}
            />
          </span>
        </Box>
      </div>

      <div className={style.rulesHolder}>{rules}</div>

      <div className={`${style.buttonHolder}`}>
        <Buttons>
          <Button
            label="Dodajte novi uslov za akciju"
            icon={<Icon>difference</Icon>}
            sx={{ width: "100%" }}
            disabled={!isLastSelected}
            onClick={() => {
              handleAddComponent(id, "row");
            }}
          />
        </Buttons>
        <Buttons>
          <Button
            label="Dodajte grupu"
            icon={<Icon>difference</Icon>}
            sx={{ width: "100%" }}
            onClick={() => {
              handleAddComponent(id, "group");
            }}
          />
        </Buttons>
      </div>
    </div>
  );
};

export default Group;
