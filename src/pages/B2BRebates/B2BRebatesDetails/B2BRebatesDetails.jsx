import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import useAPI from "../../../api/api"
import Todo from "../../../components/shared/Todo/Todo"
import { NEW } from "../../../helpers/const"
import IconList from "../../../helpers/icons"
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage"
import BasicPanel from "./Panels/BasicPanel"

const B2BRebatesDetails = () => {
    const api = useAPI()
    const params = useParams()
    const [ data, setData ] = useState({ basic: null, list: null })

    // Set the base API
    const apiPath = "/admin/rebates"

    // Check if this is a new record, or we are modifying an existing one
    const isNew = params["rebateId"] === NEW
    const rebateId = isNew ? 0 : 1 * params["rebateId"]

    // Get the existing data
    useEffect(() => {
        api
            .get(`${apiPath}/${rebateId ?? 0}`)
            .then(response => setData({ ...data, basic: response?.payload }))
            .catch((error) => {
                console.warn(error)
            })

    }, [])

    // TODO User friendly animation while data is loading
    if (!data.basic) {
        return null
    }

    // The panels for the form
    const panels = [
        {
            name     : "Rabat",
            icon     : IconList.percent,
            component: <BasicPanel data={data.basic} updateData={basic => setData({ ...data, basic })} />
        },
        {
            name     : "Kategorije",
            icon     : IconList.inboxCustomize,
            component: <Todo message="Kategorije" />
        },
        {
            name     : "Brendovi",
            icon     : IconList.stars,
            component: <Todo message="Brendovi" />
        },
        {
            name     : "Iznosi",
            icon     : IconList.bookmarks,
            component: <Todo message="Iznosi" />
        }
    ]

    // The title of the page
    const title = data.basic?.name
        ? `Izmena: "${data.basic?.name}"`
        : "Novi unos"

    return <DetailsPage title={title} fields={panels} />
}

export default B2BRebatesDetails
