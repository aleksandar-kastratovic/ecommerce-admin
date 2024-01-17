import { useContext, useEffect, useState } from "react";
import ListPage from "../../components/shared/ListPage/ListPage";
import AuthContext from "../../store/auth-contex";

import tblFields from "./tblFields.json";

const Brands = () => {
    const authCtx = useContext(AuthContext);
    const { api } = authCtx;
    const [formFieldsTemp, setFormFieldsTemp] = useState(tblFields);

    const handleInformationImage = () => {
        api.get(`admin/brands/options/upload`)
            .then((response) => {
                formatFormFields(response?.payload);
            })
            .catch((error) => console.warn(error));
    };

    const formatFormFields = (data) => {
        if (data) {
            const { allow_size, allow_format, image } = data;
            const descripiton = `Veličina fajla ne sme biti veća od ${allow_size / (1024 * 1024).toFixed(2)}MB. Dozvoljeni formati fajla: ${allow_format.map((format) => format.name).join(", ")}`;
            let arr = formFieldsTemp.map((field) => {
                if (field?.prop_name === "logo") {
                    return {
                        ...field,
                        description: descripiton,
                        validate: {
                            imageUpload: data,
                        },
                        ui_prop: {
                            fileUpload: data,
                        },
                        dimensions: { width: image?.width, height: image?.height },
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

    useEffect(() => {
        handleInformationImage();
    }, []);

    return (
        <ListPage listPageId="Brands" apiUrl="admin/brands" actionNewButton="modal" title="Brendovi" columnFields={formFieldsTemp} useColumnFields={true} apiPathCrop={`admin/brands/options/crop`} />
    );
};

export default Brands;
