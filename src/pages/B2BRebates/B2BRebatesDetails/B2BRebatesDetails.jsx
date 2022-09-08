import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import useAPI from "../../../api/api"
import NoteBox from "../../../components/shared/NoteBox/NoteBox"
import Todo from "../../../components/shared/Todo/Todo"
import { NEW } from "../../../helpers/const"
import { updateStateKey } from "../../../helpers/data"
import IconList from "../../../helpers/icons"
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage"
import BasicPanel from "./Panels/BasicPanel"
import BrandsPanel from "./Panels/BrandsPanel"
import CategoriesPanel from "./Panels/CategoriesPanel"

const B2BRebatesDetails = () => {
    const api = useAPI()
    const params = useParams()
    const [ error, setError ] = useState(null)
    const [ data, setData ] = useState({
        rebate    : null,
        brands    : null,
        categories: null
    })

    // Set the base API
    const apiPath = "/admin/rebates"

    // Check if this is a new record, or we are modifying an existing one
    const isNew = params["rebateId"] === NEW
    const rebateId = isNew ? 0 : 1 * params["rebateId"]

    // Read data
    useEffect(() => {

        // Rebate
        api.get(`${apiPath}/${rebateId ?? 0}`)
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

    }, [ rebateId ])

    // Handle errors
    if (error) {
        return <NoteBox message={`Error: ${error}`} />
    }

    // The panels for the form
    const panels = [
        {
            name     : "Rabat",
            icon     : IconList.percent,
            loading  : data.rebate,
            component: <BasicPanel data={data.rebate} updateData={rebate => setData({ ...data, rebate })} />
        },
        {
            name     : "Kategorije",
            icon     : IconList.inboxCustomize,
            enabled  : data.rebate?.id,
            component: <CategoriesPanel
                rebate={data.rebate}
                categories={data.categories}
                onUpdate={categories => updateStateKey(setData, "rebate", { ...data.rebate, categories })} />
        },
        {
            name     : "Brendovi",
            icon     : IconList.stars,
            enabled  : data.rebate?.id,
            component: <BrandsPanel
                rebate={data.rebate}
                brands={data.brands}
                onUpdate={brands => updateStateKey(setData, "rebate", { ...data.rebate, brands })} />
        },
        {
            name     : "Iznosi",
            icon     : IconList.bookmarks,
            enabled  : data.rebate?.id,
            component: <Todo message="Iznosi" />
        }
    ]

    // The title of the page
    const title = data.rebate?.name
        ? `Izmena: "${data.rebate?.name}"`
        : "Novi unos"

    return <DetailsPage title={title} fields={panels} ready={[ data.rebate, data.brands, data.categories ]} />
}

export default B2BRebatesDetails
