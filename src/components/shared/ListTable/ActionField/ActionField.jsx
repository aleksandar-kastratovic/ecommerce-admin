import FormActionButton from "../../FormActionButton/FormActionButton"
import scss from "./ActionField.module.scss"

/**
 * A standardized button with an optional icon.
 *
 * @param {string} field_type Action type with all combination
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
const ActionField = ({ field_type, systemRequired, handlePreview, handleDelete, handleEdit, handleListGroup, handleCategoryTree }) => {

    /**
     * Parse action into button parameters.
     *
     * @param {string} action The name of the action.
     *
     * @return {(string|function)[]|null} Tuple of "icon" and the action for the onClick listener.
     */
    const parseButton = (action): ?[ string, function ] => {
        switch (action) {
            case "edit":
                return [ "edit", handleEdit ]

            case "preview":
                return [ "preview", handlePreview ]

            case "delete":
                return !systemRequired
                    ? [ "delete", handleDelete ]
                    : null

            case "listGroup":
                return [ "list", handleListGroup ]

            case "categoryTree":
                return [ "account_tree", handleCategoryTree ]

            default:
                return null
        }
    }

    // The list of shown buttons
    const buttons = []

    // Actions are joined using '_'
    const actions = field_type.split("_")
    for (const action of actions) {

        // Add button if action is recognized
        const button = parseButton(action)
        if (button) {
            buttons.push(<FormActionButton key={action} icon={button[0]} onClick={button[1]} />)
        }
    }

    // FIXME Not sure why className is not accepted
    return <div className={scss.wrapper}>
        {buttons}
    </div>
}

export default ActionField
