import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import ListTable from "../ListTable/ListTable"
import ListTableToolbar from "../ListTable/ListTableToolbar"
import DeleteDialog from "../Dialogs/DeleteDialog"
import PageWrapper from "../Layout/PageWrapper/PageWrapper"
import { flatten } from "lodash"
import { useQuery } from "react-query"
import useAPI from "../../../api/api"

/**
 *
 * @param {string} apiUrl
 * @param {?string} deleteUrl
 * @param {string} title
 * @param {FieldSpec[]} columnFields
 * @param {[]} additionalButtons
 * @param {boolean} showDatePicker
 * @param {boolean}showNewButton
 *
 * @constructor
 */
const ListPage = ({
                      apiUrl = "",
                      deleteUrl = null,
                      title = "",
                      columnFields = [],
                      additionalButtons = [],
                      showDatePicker = false,
                      showNewButton = true
                  }) => {

    // TODO Sorting is disabled as it does not work with pagination
    columnFields = columnFields.map(field => ({ ...field, sortable: false }))

    const api = useAPI()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [ fieldsColumns, setFieldsColumns ] = useState(columnFields)
    const [ search, setSearch ] = useState("")
    const [ page, setPage ] = useState(1)

    // Default delete URL is the same as the main URL
    deleteUrl = deleteUrl ?? apiUrl

    const [ openDeleteDialog, setOpenDeleteDialog ] = useState({
        show  : false,
        id    : null,
        mutate: null
    })

    const { data: response, isLoading, isError } = useQuery(
        [ "openDeleteDialog.mutate", openDeleteDialog.mutate, search, page ],
        () => api.list(apiUrl, { page: page, search: search })
    )

    const handleCreateNew = () => {
        navigate("new")
    }

    const handlePageChange = (e, value) => {
        setPage(value)
    }

    const onColumnsChange = (newFields) => {
        setFieldsColumns(newFields)
    }

    const handleConfirm = async () => {
        api
            .delete(`${deleteUrl}/${openDeleteDialog.id}`)
            .then(() => {
                toast.success("Uspešno")
            })
            .catch(() => {
                toast.warning("Greška")
            })
        setOpenDeleteDialog({ show: false, id: null, mutate: 1 })
    }

    const handleCancel = () => {
        setOpenDeleteDialog({ show: false, id: null })
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        if (openDeleteDialog.mutate === 1) {
            setOpenDeleteDialog({ show: false, id: null, mutate: 0 })
        }
    }, [ openDeleteDialog.mutate ])

    useEffect(() => {
        if (isError) {
            toast.warning("Greška")
        }
    }, [ isError ])

    useEffect(() => {
        setPage(1)
    }, [ search ])

    const handleActions = (id, type) => () => {
        switch (type) {
            case "edit":
                navigate(`${pathname}/${id}`)
                break

            case "delete":
                setOpenDeleteDialog({ show: true, id: id, mutate: null })
                break

            case "listGroup":
                navigate(`${pathname}/category/${id}`)
                break

            case "categoryTree":
                navigate(`${pathname}/tree/${id}`)
                break

            default:
                break
        }
    }

    // Buttons in the page header
    const titleButtons = []
    if (showNewButton) {
        titleButtons.push({
            label  : "Novi",
            action : handleCreateNew,
            variant: "contained",
            icon   : "add"
        })
    }

    return (
        <>
            <PageWrapper
                title={title}
                actions={[ ...additionalButtons, ...titleButtons ]}
            >
                <ListTableToolbar
                    onColumnsChange={onColumnsChange}
                    fields={fieldsColumns}
                    onSearch={handleSearch}
                    searchValue={search}
                    showDatePicker={showDatePicker}
                />
                <ListTable
                    fields={flatten(fieldsColumns).filter(field => field.in_main_table)}
                    listData={response?.payload}
                    handleActions={handleActions}
                    isLoading={isLoading}
                    page={page}
                    onPageChange={handlePageChange}
                />
            </PageWrapper>

            <DeleteDialog
                title="Brisanje"
                description="Da li ste sigurni da želite da obrišete ovaj zapis?"
                openDeleteDialog={openDeleteDialog}
                setOpenDeleteDialog={setOpenDeleteDialog}
                handleConfirm={handleConfirm}
                handleCancel={handleCancel}
            />
        </>
    )
}

export default ListPage
