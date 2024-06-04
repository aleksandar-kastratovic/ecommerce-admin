import categoryFields from "../forms/rebate-types/categories.json";
import productsFields from "../forms/rebate-types/products.json";
import brandsFields from "../forms/rebate-types/brands.json";
import opt from "../forms/opt.json";
import Box from "@mui/system/Box";
import { InputSelect } from "../../../../components/shared/Form/FormInputs/FormInputs";
import { useEffect, useState } from "react";
import useAPI from "../../../../api/api";
import ListPage from "../../../../components/shared/ListPage/ListPage";
import { useTableCellActions } from "../../../../hooks/useTableCellActions";
import { useCellSubmit } from "../../../../hooks/useCellSubmit";
import { toast } from "react-toastify";
import SelectionModal from "./Conditions/SelectionModal/SelectionModal";
import { useMutation, useQuery } from "react-query";
import Button from "../../../../components/shared/Button/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUrlQueryStringParam, setUrlQueryStringParam } from "../../../../helpers/functions";

export const Rebates = ({ companyId }) => {
    const api = useAPI();
    const activeType = getUrlQueryStringParam("type") ?? "products";

    const handleFieldsData = () => {
        switch (activeType) {
            case "products":
                return productsFields;
            case "categories":
                return categoryFields;
            case "brands":
                return brandsFields;
            default:
                return productsFields;
        }
    };

    const [fields, setFields] = useState({
        data: handleFieldsData(),
        id: activeType ?? "products",
        api_url: `admin/customers-b2b/rebate-company/${activeType}/${companyId}`,
    });

    const [doesRefetch, setDoesRefetch] = useState(false);

    const onRebateTypeChange = ({ target: { value } }) => {
        switch (value) {
            case "products":
                setFields({
                    data: productsFields,
                    id: value,
                    api_url: `admin/customers-b2b/rebate-company/${value}/${companyId}`,
                });
                break;
            case "categories":
                setFields({
                    data: categoryFields,
                    id: value,
                    api_url: `admin/customers-b2b/rebate-company/${value}/${companyId}`,
                });
                break;
            case "brands":
                setFields({
                    data: brandsFields,
                    id: value,
                    api_url: `admin/customers-b2b/rebate-company/${value}/${companyId}`,
                });
                break;
        }
    };

    const getTableCellFormData = async ({ cell_data, selected }) => {
        return await api.get(`admin/customers-b2b/rebate-company/${fields?.id}/${selected?.row?.id}`).then((res) => {
            return res?.payload;
        });
    };

    const { customTableCellActions } = useTableCellActions({ clickAction: "edit", click: true, doubleClick: true, doubleClickAction: "none" });

    const submitCell = useCellSubmit();

    const cellValueChange = (value, row, column) => {
        //onchange
    };

    const onCellSubmit = (value, row, setSelected, api_url, api_method) => {
        //submit logika

        let ret = { ...value };
        if (value?.discount_value?.includes("%")) {
            ret.currency = "%";
        } else {
            ret.currency = "rsd";
        }

        submitCell(`admin/customers-b2b/rebate-company/${fields?.id}`, api_method, ret, setDoesRefetch);
        setDoesRefetch(true);
        setSelected({
            row: null,
            column: null,
        });
    };

    useEffect(() => {
        if (doesRefetch) {
            setDoesRefetch(false);
        }
    }, [doesRefetch]);

    const [openDialog, setOpenDialog] = useState({ show: false, rowId: null });

    const [options, setOptions] = useState([]);

    const { data, isFetching: isLoading } = useQuery(
        ["rebatesSelect", options, companyId, fields?.id],
        async () => {
            return await api
                .post(`/admin/customers-b2b/rebate-company/${fields?.id}/select-${fields?.id}`, {
                    page: options?.page ?? 1,
                    search: options?.search ?? "",
                    limit: options?.limit ?? 10,
                    sort: options?.sort ?? {},
                    filters: options?.filters ?? [],
                })
                .then((res) => {
                    return res?.payload;
                })
                .catch((err) => toast.error(err?.response?.data?.message ?? err?.response?.data?.payload?.message ?? "Došlo je do greške"));
        },
        { refetchOnWindowFocus: false, keepPreviousData: true }
    );

    const [selectedValues, setSelectedValues] = useState([]);

    const onTableChange = (data) => {
        setSelectedValues(data);
    };

    const { data: message, refetch } = useQuery(
        [companyId],
        async () => {
            return await api
                .get(`admin/customers-b2b/rebate-company/main/allow-use/${companyId}`)
                .then((res) => res?.payload)
                ?.catch((err) => console.warn(err));
        },
        { refetchOnWindowFocus: false }
    );

    const { mutate: handleSave, isLoading: isPending } = useMutation(["rebatesSelectSave", selectedValues], async () => {
        let ret = {};
        switch (fields?.id) {
            case "products":
                ret = {
                    company_id: companyId,
                    product_ids: selectedValues?.map(({ id }) => id),
                };
                break;
            case "categories":
                ret = {
                    company_id: companyId,
                    category_ids: selectedValues?.map(({ id }) => id),
                };
                break;
            case "brands":
                ret = {
                    company_id: companyId,
                    brand_ids: selectedValues?.map(({ id }) => id),
                };
        }
        return await api
            .post(`/admin/customers-b2b/rebate-company/${fields?.id}/save-selected-${fields?.id}`, ret)
            .then((res) => {
                toast.success("Uspešno sačuvano");
                setOpenDialog({ show: false });
                setSelectedValues([]);
                setDoesRefetch(true);
                refetch();
            })
            .catch((err) => {
                toast.error(err?.response?.data?.payload?.message ?? "Došlo je do greške");
                setSelectedValues([]);
            });
    });

    const customActions = {
        edit: {
            type: "custom",
            display: false,
        },
    };

    const navigate = useNavigate();

    const handleRebateTypeSelect = (field) => {
        let queryString = setUrlQueryStringParam("type", fields?.id);
        navigate(`/b2b-companies/${companyId}?${queryString}`, { replace: true });
    };

    useEffect(() => {
        handleRebateTypeSelect(fields?.id);
    }, [fields?.id]);

    return (
        <>
            {message?.status === false && <p>{message?.message}</p>}

            <Box
                sx={{
                    width: "100%",
                    marginTop: "3rem",
                }}
            >
                <ListPage
                    // additionalButtons={buttons}
                    doesRefetch={doesRefetch}
                    listPageId={`Rebates-${fields?.id}`}
                    customActions={customActions}
                    title={
                        <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <InputSelect
                                styleFormControl={{
                                    width: "fit-content",
                                }}
                                value={fields?.id}
                                options={opt}
                                label={`Izaberite tip rabata`}
                                onChange={(e) => onRebateTypeChange(e)}
                            />
                            <Button
                                sx={{
                                    marginBottom: "-1.7rem",
                                }}
                                label={`Novi unos`}
                                variant={`contained`}
                                icon={`add`}
                                onClick={() => setOpenDialog({ show: true })}
                            />
                        </Box>
                    }
                    columnFields={fields?.data}
                    validateData={(data, field) => {
                        console.log(data, field);
                    }}
                    apiUrl={fields?.api_url}
                    deleteUrl={`admin/customers-b2b/rebate-company/${fields?.id}`}
                    showNewButton={false}
                    tableCellActions={{
                        actions: customTableCellActions,
                        onChange: cellValueChange,
                        onSubmit: onCellSubmit,
                        getTableCellFormData: getTableCellFormData,
                        cell_fields: null,
                    }}
                />
            </Box>

            <SelectionModal
                onChange={onTableChange}
                selectedValues={selectedValues}
                isLoadingOpt={isLoading}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                options={options}
                component={`table`}
                save={{
                    button: true,
                    fnc: handleSave,
                    isPending: isPending,
                }}
                opt={data}
                setOptions={setOptions}
            />
        </>
    );
};
