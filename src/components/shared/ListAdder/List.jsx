import { Button } from "@mui/material";
import { isEmpty } from "lodash";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../store/auth-contex";
import ListItem from "./ListItem";

import styles from "./List.module.scss";
import useAPI from "../../../api/api";

const List = ({
  listFields = [],
  formFields = [],
  init = {},
  required = [],
  onSave = () => {},
  onDelete = () => {},
  additionalButtons = [],
  actions = {},
}) => {
  const [fields, setFields] = useState(listFields);
  const [load, setLoad] = useState(false);
  const { user } = useContext(AuthContext);

  const deleteHandler = async (id, dataId) => {
    if (dataId !== null && dataId !== undefined) {
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
    if (load) {
      setFields(listFields);
    }
  }, [load, listFields]);

  useEffect(() => {
    setLoad(true);
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

      {Array.isArray(fields) &&
        fields.map((field, index) => {
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
