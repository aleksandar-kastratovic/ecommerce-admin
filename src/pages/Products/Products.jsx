import { useEffect, useState } from "react";
import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";
import listCheckbox from "./listCheckbox.json";
import ModalForm from "../../components/shared/Modal/ModalForm";
import { useTableCellActions } from "../../hooks/useTableCellActions";
import { useCellSubmit } from "../../hooks/useCellSubmit";
import useAPI from "../../api/api";
import FormWrapper from "../../components/shared/Layout/FormWrapper/FormWrapper";
import { Typography, Box, CircularProgress } from "@mui/material";
import Form from "../../components/shared/Form/Form";
import { toast } from "react-toastify";

const Products = () => {
    const [openModal, setOpenModal] = useState({ show: false, id: null, name: null });
    const [fieldsTmp, setFieldsTmp] = useState();
    const [doesRefetch, setDoesRefetch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const customActions = {
        contentCopy: {
            type: "custom",
            display: true,
            position: 2,
            clickHandler: {
                type: "",
                fnc: (rowData) => {
                    return setOpenModal({ show: true, id: rowData.id, name: rowData.name });
                },
            },
            icon: "content_copy",
            title: "Dupliraj",
        },
    };

    const api = useAPI();

    const getTableCellFormData = async ({ cell_data, selected }) => {
        return await api.get(`${cell_data?.api_path}/${cell_data?.queryString}`).then((res) => {
            return res?.payload;
        });
    };

    const { customTableCellActions } = useTableCellActions({ clickAction: "edit", click: true, doubleClick: true, doubleClickAction: "none" });

    const submitCell = useCellSubmit();

    const cellValueChange = (value, row, column) => {
        console.log(value, row, column);
    };

    const onCellSubmit = (value, row, setSelected, api_url, api_method) => {
        submitCell(api_url, api_method, value, setDoesRefetch);
        setSelected({
            row: null,
            column: null,
        });
        setFieldsTmp(null);
    };

    useEffect(() => {
        if (doesRefetch) {
            setDoesRefetch(false);
        }
    }, [doesRefetch]);

    const submitHandler = (data) => {
        setIsLoading(true);
        return api
            .post(`admin/product-items/list/clone`, data)
            .then((res) => {
                setIsLoading(false);
                setDoesRefetch(!doesRefetch);
                toast.success(`Uspešno`);
                setOpenModal({ show: false, id: null, name: null });
                return res?.payload;
            })
            .catch((error) => {
                setIsLoading(false);
                toast.warning(error?.response?.data?.message ?? error?.response?.data?.payload?.message ?? "Greška");
                return error;
            });
    };

    return (
        <>
            <ListPage
                listPageId="Products"
                apiUrl="admin/product-items/list"
                deleteUrl="admin/product-items/basic-data"
                title="Proizvodi"
                columnFields={tblFields}
                customActions={customActions}
                tableCellActions={{
                    actions: customTableCellActions,
                    onChange: cellValueChange,
                    onSubmit: onCellSubmit,
                    getTableCellFormData: getTableCellFormData,
                    cell_fields: fieldsTmp,
                }}
                doesRefetch={doesRefetch}
                setDoesRefetch={setDoesRefetch}
            />
            <ModalForm anchor="right" openModal={openModal} setOpenModal={setOpenModal} sx={{ padding: "2rem" }} apiPathFormModal="admin/product-items/list/clone">
                {isLoading ? (
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <CircularProgress size="2rem" sx={{ marginTop: "50vh" }} />
                    </Box>
                ) : (
                    <FormWrapper title={`Da li ste sigurni da želite da duplirate proizvod ${openModal.name}?`}>
                        <Typography variant="body2" sx={{ marginBottom: "0.8rem" }}>
                            Dupliranjem se automatski dupliraju sledeći podaci proizvoda: Osnovno, Opis, Deklarijacija. Pored navedenih podataka možete odabrati koje još podatke želite da duplirate za
                            novi proizvod.
                        </Typography>

                        <Form
                            formFields={listCheckbox}
                            initialData={{
                                id_product: openModal.id,
                                categories: 1,
                                inventories: 1,
                                prices: 1,
                                seo: 1,
                                crossselles: 1,
                                upsells: 1,
                                related: 1,
                                attributes: 1,
                                variantsAttributes: 1,
                                gallery: 1,
                                docs: 1,
                            }}
                            onSubmit={submitHandler}
                            styleCheckbox={{ padding: "0 0.563rem 0 0.563rem" }}
                        />
                    </FormWrapper>
                )}
            </ModalForm>
        </>
    );
};

export default Products;
