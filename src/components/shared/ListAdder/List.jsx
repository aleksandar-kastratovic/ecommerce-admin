import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../store/auth-contex";
import ListItem from "./ListItem";

import styles from "./List.module.scss";
import Button from "../Button/Button";

const List = ({
  listFields = [],
  formFields = [],
  init = {},
  addFieldLabel = "Dodaj polje",
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
        <Button
          label={addFieldLabel}
          onClick={addFieldHandler}
          icon="add"
          variant="contained"
        />

        <div className={styles.additionalButtonsHolder}>
          {additionalButtons.map((button) => {
            return (
              <Button
                key={button.id}
                icon={button.icon}
                label={button.text}
                onClick={button.action}
              />
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
