import { Icon } from "@mui/material";
import scss from "./ActionField.module.scss";

/**
 * A standardized button with an optional icon.
 *
 * @param {string} fieldType Action type with all combination
 * @param {bool} systemRequired Set to true to hide "Delete" button.
 * @param {function} handlePreview The callback to invoke when the preview button is clicked.
 * @param {function} handleDelete The callback to invoke when the delete button is clicked.
 * @param {function} handleEdit The callback to invoke when the edit button is clicked.
 * @param {function} handleListGroup The callback to invoke when the edit button is clicked.
 * @param {function} handleCategoryTree The callback to invoke when the edit button is clicked.
 *
 * @return {JSX.Element}
 * @constructor
 */
const ActionField = ({ fieldType, systemRequired, handlePreview, handleDelete, handleEdit, handleListGroup, handleCategoryTree }) => {
    /**
     * Parse action into button parameters.
     *
     * @param {string} action The name of the action.
     *
     * @return {(string|function)[]|null} Tuple of "icon" and the action for the onClick listener.
     */

    {
        /* TODO isto i u ListTableBody, typeannotation sluzi samo u typescript, da li je ovde podrebna anotacija i cemu sluzi? */
    }
    const parseButton = (action): ?[string, function] => {
        switch (action) {
            case "edit":
                return ["edit", handleEdit];

            case "preview":
                return ["preview", handlePreview];

            case "delete":
                return !systemRequired ? ["delete", handleDelete] : null;

            case "listGroup":
                return ["list", handleListGroup];

            case "categoryTree":
                return ["account_tree", handleCategoryTree];

            default:
                return null;
        }
    };

    // Actions are joined with '_', extract them and make sure we can parse then into button parameters
    const actions = fieldType
        .split("_")
        .map((action) => parseButton(action))
        .filter((action) => action);

    return (
        <div className={scss.wrapper}>
            {actions.map((button) => (
                <span key={button[0]} className={`${scss.button} ${scss[button[0]]}`} onClick={button[1]}>
                    <Icon className={button[0]}>{button[0]}</Icon>
                </span>
            ))}
        </div>
    );
};

export default ActionField;
