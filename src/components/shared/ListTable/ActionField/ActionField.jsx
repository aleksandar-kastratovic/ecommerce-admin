import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { useState } from "react";
import FormActionButton from "../../FormActionButton/FormActionButton";

/**
 * A standardized button with an optional icon.
 *
 * @param {"edit_preview_delete"} field_type Action type with all combination
 * @param {function} handlePreview The callback to invoke when the preview button is clicked.
 * @param {function} handleDelete The callback to invoke when the delete button is clicked.
 * @param {function} handleEdit The callback to invoke when the edit button is clicked.
 * @return {JSX.Element}
 * @constructor
 */
const ActionField = ({
  field_type = "",
  handlePreview = () => {},
  handleDelete = () => {},
  handleEdit = () => {},
  handleListGroup = () => {},
  handleCategoryTree = () => {},
}) => {
  const [displayed, setDisplayed] = useState([]);

  const getDisplayed = () => {
    let content = [];
    let actions = field_type.split("_");
    for (const action of actions) {
      let button;
      switch (action) {
        case "edit":
          button = (
            <FormActionButton icon="edit" onClick={handleEdit} key={action} />
          );
          break;
        case "preview":
          button = (
            <FormActionButton
              icon="preview"
              onClick={handlePreview}
              key={action}
            />
          );
          break;
        case "delete":
          button = (
            <FormActionButton
              icon="delete"
              onClick={handleDelete}
              key={action}
            />
          );
          break;
        case "listGroup":
          button = (
            <FormActionButton
              icon="list"
              onClick={handleListGroup}
              key={action}
            />
          );
          break;
        case "categoryTree":
          button = (
            <FormActionButton
              icon="account_tree"
              onClick={handleCategoryTree}
              key={action}
            />
          );
          break;
        default:
          button = null;
          break;
      }
      content.push(button);
    }
    setDisplayed(content);
  };

  useEffect(() => {
    getDisplayed();
  }, []);

  return (
    <>
      {displayed.map((item) => {
        return item;
      })}
    </>
  );
};

export default ActionField;
