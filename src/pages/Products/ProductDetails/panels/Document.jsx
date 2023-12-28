import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import formFields from "../forms/document.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";
import AuthContext from "../../../../store/auth-contex";
import { useFileSize } from "../../../../hooks/useFileSize";

const Document = ({ productId }) => {
    const authCtx = useContext(AuthContext);
    const { api } = authCtx;
    const [file, setFile] = useState(null);

    const [formFieldsTemp, setFormFieldsTemp] = useState(formFields);

    const customActions = {
        delete: {
            clickHandler: {
                type: "dialog_delete",
                fnc: (rowData) => {
                    return {
                        show: true,
                        id: rowData.id,
                        mutate: null,
                    };
                },
            },
            deleteClickHandler: {
                type: "dialog_delete",
                fnc: (rowData) => {
                    api.delete(`admin/product-items/documents/list/${rowData.id}`)
                        .then(() => toast.success("Zapis je uspešno obrisan"))
                        .catch(() => toast.warning("Došlo je do greške prilikom brisanja"));

                    return {
                        show: false,
                        id: rowData.id,
                        mutate: 1,
                    };
                },
            },
        },
        edit: {
            clickHandler: {
                type: "modal_form",
                fnc: (rowData) => {
                    api.get(`admin/product-items/documents/basic-data/${rowData.id}`)
                        .then((response) => {
                            setFile({
                                name: response?.payload?.file_filename,
                                base_64: response?.payload?.file_base64,
                            });
                        })
                        .catch((error) => console.log(error));
                    return {
                        show: true,
                        id: rowData.id,
                    };
                },
            },
        },
        downloadFile: {
            type: "custom",
            display: true,
            position: 2,
            icon: "download",
            title: "Preuzmite dokument",
            clickHandler: {
                type: "",
                fnc: (rowData) => {
                    const fileId = rowData?.file;
                    window.open(`${fileId}`, "_blank");
                },
            },
        },
        copyFile: {
            type: "custom",
            display: true,
            position: 3,
            icon: "content_copy",
            title: "Kopirajte putanju fajla",
            clickHandler: {
                type: "",
                fnc: (rowData) => {
                    const filePath = rowData?.file;
                    navigator.clipboard
                        .writeText(filePath)
                        .then(() => {
                            toast.success("Putanja fajla je kopirana.");
                        })
                        .catch((error) => {
                            toast.error("Došlo je do greške pri kopiranju putanje fajla.");
                        });
                },
            },
        },
    };

    const formatFormFields = (data, segment) => {
        const {
            allow_size,
            allow_format,
            image: { width, height },
        } = data;
        const description = `Veličina  fajla ne sme biti veća od ${allow_size / (1024 * 1024).toFixed(2)}MB. Dozvoljeni formati fajla: ${allow_format.map((format) => format.name).join(", ")}`;
        if (data) {
            const arr = formFieldsTemp?.map((field) => {
                if (field?.prop_name === segment) {
                    return {
                        ...field,
                        description: description,
                        validate: {
                            imageUpload: data,
                        },
                        ui_prop: {
                            fileUpload: {
                                allow_format: allow_format,
                                allow_size: allow_size,
                                image: {
                                    width: width,
                                    height: height,
                                },
                            },
                        },
                    };
                } else {
                    return {
                        ...field,
                    };
                }
            });

            setFormFieldsTemp([...arr]);
        }
    };

    const handleInformationImage = () => {
        //url api-ja se nalazi u formFields => ui_prop => imageUpload => fillFromApi
        formFieldsTemp?.forEach((field) => {
            const fillFromApi = field?.ui_prop?.fileUpload?.fillFromApi;
            if (fillFromApi) {
                api.get(fillFromApi)
                    .then((response) => {
                        //proveravamo da li je prethodni response stigao i funkcija odradjena, da bismo pozvali novi api
                        if (response?.payload) {
                            formatFormFields(response?.payload, field?.prop_name);
                        }
                    })
                    .catch((error) => console.warn(error));
            }
        });
    };

    useEffect(() => {
        handleInformationImage();
    }, [formFieldsTemp]);

    const documentField = formFieldsTemp?.find((field) => field?.field_name === "Dokument");
    const allowedSize = documentField?.validate?.imageUpload?.allow_size;

    useEffect(() => {
        if (file) {
            //pravimo objekat koji sadrzi velicinu i tip fajla
            const fileInfo = useFileSize(file);
            if (fileInfo?.size > allowedSize) {
                toast.error(`Veličina fajla ne sme biti veća od ${(allowedSize / (1024 * 1024)).toFixed(2)}MB`);
                setFile(null);
            }
        }
    }, [file]);

    return (
        <>
            <ListPage
                listPageId="Documents"
                apiUrl={`admin/product-items/documents/list/${productId}`}
                editUrl={`admin/product-items/documents/basic-data`}
                title=" "
                columnFields={formFieldsTemp}
                useColumnFields={true}
                actionNewButton="modal"
                initialData={{ id_product: productId, file_base64: file?.base_64 }}
                addFieldLabel="Dodajte novi dokument"
                showAddButton={true}
                customActions={customActions}
                onFilePicked={setFile}
                selectedFile={file}
                onNewButtonPress={() => {
                    setFile(null);
                }}
            />
        </>
    );
};

export default Document;
