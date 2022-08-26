import { Button } from "@mui/material";
import { isEmpty } from "lodash";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../store/auth-contex";
import ListItem from "./ListItem";

import styles from "./List.module.scss";

const List = ({
  listFields = [],
  formFields = [],
  init = {},
  onDelete = () => {},
  required = [],
  onSave = () => {},
  additionalButtons = [],
  actions = {},
}) => {
  const [fields, setFields] = useState(listFields);
  const { user } = useContext(AuthContext);

  const deleteHandler = async (id, dataId) => {
    if (dataId !== null) {
      try {
        await onDelete(user.access_token, dataId);
      } catch (error) {
        console.warn(error);
      }
    }
    let newFields = [...fields.slice(0, id), ...fields.slice(id + 1)];
    setFields([...newFields]);
  };

  const addFieldHandler = () => {
    setFields([...fields, init]);
  };

  useEffect(() => {
    setFields(listFields);
  }, [listFields]);

  useEffect(() => {
    setFields(listFields);
  }, []);

  return (
    <div className={styles.list}>
      <div className={styles.buttonsHolder}>
        <Button onClick={addFieldHandler} className={styles.buttonPrimary}>
          Add field
        </Button>
        <div className={styles.additionalButtonsHolder}>
          {additionalButtons.map((button) => {
            return (
              <Button
                key={button.id}
                onClick={button.action}
                className={`${styles.buttonAdditional} ${button.className}`}
              >
                {button.icon}
                {button.text}
              </Button>
            );
          })}
        </div>
      </div>

      {fields.map((field, index) => {
        return (
          <ListItem
            key={field.id !== undefined ? field.id : `${index}new`}
            data={listFields[index] ?? init}
            index={index}
            onDelete={deleteHandler}
            saveData={onSave}
            required={required}
            formFields={formFields}
            actions={actions}
          />
        );
      })}
    </div>
  );
};

export default List;
