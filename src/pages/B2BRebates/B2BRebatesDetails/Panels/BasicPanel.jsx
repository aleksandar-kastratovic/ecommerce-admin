import { toast } from "react-toastify"
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

    // Variables
    const apiPath = "/admin/rebates/"
    const fieldSpec = B2BRebatesFieldSpec

    // Submit the data to the API
    const onSubmit = data => api
        .post(apiPath, data)
        .then(response => {
            toast.success("Uspešno")

            // Update for parents
            updateData && updateData(response.payload)

        })
        .catch((error) => {
            toast.warning("Greška")
            console.warn(error)
        })

    return (
        <Form
            initialData={data}
            formFields={fieldSpec}
            cancelButton={false}
            onSubmit={onSubmit} />
    )
}

export default BasicPanel
