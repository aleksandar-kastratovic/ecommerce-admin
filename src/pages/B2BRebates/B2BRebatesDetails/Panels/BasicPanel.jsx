import useAPI from "../../../../api/api"
import Form from "../../../../components/shared/Form/Form"
import B2BRebatesFieldSpec from "../../B2BRebatesFieldSpec.json"

/**
 * Form that allows user to edit basic info.
 *
 * @param {{}} data The data to initially populate the form with.
 * @param {function({})} updateData Update the data.
 *
 * @return {JSX.Element}
 * @constructor
 */
const BasicPanel = ({ data, updateData }) => {
    const api = useAPI()

    return (
        <Form
            initialData={data}
            formFields={B2BRebatesFieldSpec}
            cancelButton={false}
            onSubmit={updateData} />
    )
}

export default BasicPanel
