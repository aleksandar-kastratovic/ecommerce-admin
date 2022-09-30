import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import useAPI from "../../../api/api"
import NoteBox from "../../../components/shared/NoteBox/NoteBox"
import { NEW } from "../../../helpers/const"
import { updateStateKey } from "../../../helpers/data"
import IconList from "../../../helpers/icons"
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage"
import BasicPanel from "./Panels/BasicPanel"

const B2BRebateTiersDetails = () => {
    const api = useAPI()
    const params = useParams()
    const [ error, setError ] = useState(null)
    const [ data, setData ] = useState({
        rebateTier: null
    })

    // Check if this is a new record, or we are modifying an existing one
    const isNew = params["rebateTierId"] === NEW
    const rebateTierId = isNew ? 0 : 1 * params["rebateTierId"]

    // Read data
    useEffect(() => {

        // Rebate tier
        api.get(`/admin/rebates/tiers/${rebateTierId ?? 0}`)
            .then(response => updateStateKey(setData, "rebateTier", response?.payload))
            .catch(setError)

    }, [ rebateTierId ])

    // Handle errors
    if (error) {
        return <NoteBox message={`Error: ${error}`} />
    }

    // Update from the basic table
    const updateBasic = rebateTier =>
        submit({
            ...data.rebateTier,
            id   : rebateTier.id,
            name : rebateTier.name,
            order: rebateTier.order
        })

    // Send to API
    const submit = rebateTier => {
        updateStateKey(setData, "rebateTier", rebateTier)
        api
            .post("/admin/rebates/tiers", rebateTier)
            .then(response => {
                setData(data => ({ ...data, rebateTier: { ...data.rebateTier, id: response.payload.id } }))
                toast.success("Uspešno sačuvano")

            })
            .catch((error) => {
                toast.warning("Došlo je do greške")
                console.warn(error)
            })
    }

    // The panels for the form
    const panels = [
        {
            name     : "Rabatna skala",
            icon     : IconList.barChart,
            loading  : data.rebateTier,
            component: <BasicPanel data={data.rebateTier} updateData={updateBasic} />
        }
    ]

    // The title of the page
    const title = !isNew
        ? `Izmena: ${data.rebateTier?.name ? `"${data.rebateTier.name}"` : ""}`
        : "Novi unos"

    return <DetailsPage title={title} fields={panels} ready={[ data.rebateTier ]} />
}

export default B2BRebateTiersDetails
