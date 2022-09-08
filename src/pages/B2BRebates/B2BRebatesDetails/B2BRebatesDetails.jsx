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
import BrandsPanel from "./Panels/BrandsPanel"
import CategoriesPanel from "./Panels/CategoriesPanel"
import TiersPanel from "./Panels/TiersPanel"

const B2BRebatesDetails = () => {
    const api = useAPI()
    const params = useParams()
    const [ error, setError ] = useState(null)
    const [ data, setData ] = useState({
        rebate    : null,
        brands    : null,
        categories: null,
        tiers     : null
    })

    // Check if this is a new record, or we are modifying an existing one
    const isNew = params["rebateId"] === NEW
    const rebateId = isNew ? 0 : 1 * params["rebateId"]

    // Read data
    useEffect(() => {

        // Rebate
        api.get(`/admin/rebates/${rebateId ?? 0}`)
            .then(response => updateStateKey(setData, "rebate", response?.payload))
            .catch(setError)

        // Categories
        api.put(`/category/all`, { limit: -1 })
            .then(response => updateStateKey(setData, "categories", response))
            .catch(setError)

        // Brands
        api.list(`/admin/brands`, { limit: -1 })
            .then(response => updateStateKey(setData, "brands", response?.payload.items))
            .catch(setError)

        // Tiers
        api.list(`/admin/rebates/tiers`, { limit: -1 })
            .then(response => updateStateKey(setData, "tiers", response?.payload.items))
            .catch(setError)

    }, [ rebateId ])

    // Handle errors
    if (error) {
        return <NoteBox message={`Error: ${error}`} />
    }

    // Update from the basic table
    const updateBasic = rebate =>
        submit({
            ...data.rebate,
            name       : rebate.name,
            description: rebate.description
        })

    // Send to API
    const submit = rebate => {
        updateStateKey(setData, "rebate", rebate)
        api
            .post("/admin/rebates", rebate)
            .then(response => {
                setData(data => ({ ...data, rebate: { ...data.rebate, id: response.payload.id } }))
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
            name     : "Rabat",
            icon     : IconList.percent,
            loading  : data.rebate,
            component: <BasicPanel data={data.rebate} updateData={updateBasic} />
        },
        {
            name     : "Kategorije",
            icon     : IconList.inboxCustomize,
            enabled  : data.rebate?.id,
            component: <CategoriesPanel
                rebate={data.rebate}
                categories={data.categories}
                onUpdate={categories => submit({ ...data.rebate, categories })} />
        },
        {
            name     : "Brendovi",
            icon     : IconList.stars,
            enabled  : data.rebate?.id,
            component: <BrandsPanel
                rebate={data.rebate}
                brands={data.brands}
                onUpdate={brands => submit({ ...data.rebate, brands })} />
        },
        {
            name     : "Iznosi",
            icon     : IconList.bookmarks,
            enabled  : data.rebate?.id,
            component: <TiersPanel
                rebate={data.rebate}
                tiers={data.tiers}
                onUpdate={tiers => submit({ ...data.rebate, tiers })} />
        }
    ]

    // The title of the page
    const title = !isNew
        ? `Izmena: ${data.rebate?.name ? `"${data.rebate.name}"` : ""}`
        : "Novi unos"

    return <DetailsPage title={title} fields={panels} ready={[ data.rebate, data.tiers, data.categories, data.categories ]} />
}

export default B2BRebatesDetails
