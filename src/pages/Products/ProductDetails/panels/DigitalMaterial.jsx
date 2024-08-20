import { useEffect, useState } from "react";
import ListPage from "../../../../components/shared/ListPage/ListPage";
import tblfields from "../forms/digital_material.json";

const DigitalMaterial = ({ productId }) => {
    const [file, setFile] = useState(null);
    const [fields, setFields] = useState(tblfields);

    const validate = (data, field) => {
        if (field === "download_type") {
            if (data.download_type === "link") {
                setFields((old) => {
                    return old.map((field) => {
                        if (field.prop_name === "download_file_path") {
                            field.in_details = false;
                        }

                        if (field.prop_name === "download_file_link") {
                            field.in_details = true;
                        }
                        return field;
                    });
                });
            }
            if (data.download_type === "upload") {
                setFields((old) => {
                    return old.map((field) => {
                        if (field.prop_name === "download_file_path") {
                            field.in_details = true;
                        }

                        if (field.prop_name === "download_file_link") {
                            field.in_details = false;
                        }
                        return field;
                    });
                });
            }
        }

        if (field === "sample_type") {
            console.log(field);
            if (data.download_type === "link") {
                setFields((old) => {
                    return old.map((field) => {
                        if (field.prop_name === "sample_file_path") {
                            field.in_details = false;
                        }

                        if (field.prop_name === "sample_file_link") {
                            field.in_details = true;
                        }
                        return field;
                    });
                });
            }
            if (data.download_type === "upload") {
                setFields((old) => {
                    return old.map((field) => {
                        if (field.prop_name === "sample_file_path") {
                            field.in_details = true;
                        }

                        if (field.prop_name === "sample_file_link") {
                            field.in_details = false;
                        }
                        return field;
                    });
                });
            }
        }
        return data;
    };

    useEffect(() => {
        console.log(file);
    }, [file]);
    return (
        <ListPage
            listPageId="DigitalMaterial"
            apiUrl={`admin/product-items/digital-material/list/${productId}`}
            editUrl={`admin/product-items/digital-material/basic-data`}
            title=" "
            columnFields={fields}
            validateData={validate}
            useColumnFields={true}
            actionNewButton="modal"
            initialData={{ id_product: productId, material: file?.base_64 }}
            addFieldLabel="Dodajte novi materijal"
            showAddButton={true}
            onFilePicked={setFile}
            selectedFile={file}
            onNewButtonPress={() => {
                setFile(null);
            }}
        />
    );
};

export default DigitalMaterial;
