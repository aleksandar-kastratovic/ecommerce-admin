import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./tblFields.json";
import AuthContext from "../../store/auth-contex";
import { set } from "lodash";

const B2Cbanners = ({}) => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const { api } = authCtx;
    const [formFieldsTemp, setFormFieldsTemp] = useState(tblFields);
    const [idPosition, setIdPosition] = useState(null);

    const buttons = [
        {
            label: "Pozicije",
            action: () => {
                navigate("positions");
            },
        },
    ];

    const customActions = {
        edit: {
            clickHandler: {
                type: "modal_form",
                fnc: (rowData) => {
                    setIdPosition(rowData?.id_position);
                    filterFields(formFieldsTemp, rowData?.position_type);
                    getForm();
                    return {
                        show: true,
                        id: rowData.id,
                    };
                },
            },
        },
    };

    const filterFields = (fields, type) => {
        let arr = [];
        if (type === "gallery") {
            arr = fields?.map((item, i) => {
                const { prop_name } = item;
                if (prop_name === "position_name" || prop_name === "title" || prop_name === "subtitle" || prop_name === "text") {
                    return {
                        ...item,
                        in_details: false,
                    };
                }
                return {
                    ...item,
                    in_details: true,
                };
            });
        } else if (type === "image") {
            arr = fields?.map((item, i) => {
                const { prop_name } = item;
                if (prop_name === "position_name" || prop_name === "title" || prop_name === "subtitle" || prop_name === "text") {
                    return {
                        ...item,
                        in_details: false,
                    };
                }
                return {
                    ...item,
                    in_details: true,
                };
            });
        } else if (type === "image_description") {
            arr = fields?.map((item, i) => {
                const { prop_name } = item;
                if (prop_name === "position_name") {
                    return {
                        ...item,
                        in_details: false,
                    };
                }
                return {
                    ...item,
                    in_details: true,
                };
            });
        } else {
            arr = [...tblFields];
        }

        setFormFieldsTemp([...arr]);
    };

    const validateData = (data, field) => {
        let ret = data;
        switch (field) {
            case "id_position":
                let index = formFieldsTemp.findIndex((it) => {
                    return it.prop_name === "id_position";
                });
                let idPositionObject = formFieldsTemp[index];
                let path = `${idPositionObject?.fillFromApi}/${idPositionObject?.prop_name}?id_position=${ret?.id_position}`;
                api.get(path)
                    .then((response) => {
                        const idPositionArr = response?.payload;
                        const selectedIdPositionItem = idPositionArr.find((systemItem) => systemItem.id === ret.id_position);
                        if (selectedIdPositionItem) {
                            filterFields(formFieldsTemp, selectedIdPositionItem.type);
                            setIdPosition(ret?.id_position);
                        }
                    })
                    .catch((error) => console.log(error));

                return ret;
            default:
                return ret;
        }
    };

    const [imageData, setImageData] = useState(null);

    const getForm = async () => {
        let res;
        await api
            .get(`admin/banners-b2c/positions/slug/${idPosition}`)
            .then((response) => {
                res = response?.payload;
                if (res) {
                    let dimensions = { width: res.width, height: res.height };
                    let arr = [];
                    switch (res.type) {
                        case "image":
                            arr = formFieldsTemp?.map((formItem, i) => {
                                const { prop_name } = formItem;
                                if (prop_name === "image") {
                                    return {
                                        ...formItem,
                                        dimensions: dimensions,
                                        ui_prop: {
                                            fileUpload: {
                                                image: {
                                                    width: dimensions.width,
                                                    height: dimensions.height,
                                                },
                                                allow_format: imageData.allow_format,
                                                allow_size: imageData.allow_size,
                                            },
                                        },
                                    };
                                }
                                return {
                                    ...formItem,
                                };
                            });
                            setFormFieldsTemp([...arr]);
                            break;
                        case "image_description":
                            arr = formFieldsTemp?.map((formItem, i) => {
                                const { prop_name } = formItem;
                                if (prop_name === "image") {
                                    return {
                                        ...formItem,
                                        dimensions: dimensions,
                                        ui_prop: {
                                            fileUpload: {
                                                image: {
                                                    width: dimensions.width,
                                                    height: dimensions.height,
                                                },
                                                allow_format: imageData.allow_format,
                                                allow_size: imageData.allow_size,
                                            },
                                        },
                                    };
                                }
                                return {
                                    ...formItem,
                                };
                            });
                            setFormFieldsTemp([...arr]);
                            break;
                        case "gallery":
                            arr = formFieldsTemp?.map((formItem, i) => {
                                const { prop_name } = formItem;
                                if (prop_name === "image") {
                                    return {
                                        ...formItem,
                                        dimensions: dimensions,
                                        ui_prop: {
                                            fileUpload: {
                                                image: {
                                                    width: dimensions.width,
                                                    height: dimensions.height,
                                                },
                                                allow_format: imageData.allow_format,
                                                allow_size: imageData.allow_size,
                                            },
                                        },
                                    };
                                }
                                return {
                                    ...formItem,
                                };
                            });
                            setFormFieldsTemp([...arr]);
                            break;
                        default:
                            console.log("deafult");
                            break;
                    }
                }
            })
            .catch((error) => {
                console.warn(error);
            });
    };

    useEffect(() => {
        if (idPosition) {
            getForm();
        }
    }, [idPosition]);

    const formatFormFields = (data, segment) => {
        if (data) {
            const {
                allow_size,
                allow_format,
                image: { width, height },
            } = data;
            const description = `Veličina fajla ne sme biti veća od ${allow_size / (1024 * 1024).toFixed(2)}MB. Dozvoljeni formati fajla: ${allow_format.map((format) => format.name).join(", ")}`;
            let arr = formFieldsTemp.map((field) => {
                if (field?.prop_name === segment) {
                    return {
                        ...field,
                        description: description,
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
            if (fillFromApi && idPosition !== null) {
                api.get(`${fillFromApi}?id_position=${idPosition}`)
                    .then((response) => {
                        formatFormFields(response?.payload, field?.prop_name);
                        setImageData(response?.payload);
                    })
                    .catch((error) => console.warn(error));
            }
        });
    };

    useEffect(() => {
        handleInformationImage();
    }, [formFieldsTemp, idPosition]);
    console.log(formFieldsTemp);
    return (
        <ListPage
            validateData={validateData}
            customActions={customActions}
            listPageId="B2Cbanners"
            title={"B2C baneri"}
            apiUrl="admin/banners-b2c/main"
            apiPathCrop={`admin/banners-b2c/main/options/crop?id_position=${idPosition}`}
            columnFields={formFieldsTemp}
            additionalButtons={buttons}
            actionNewButton="modal"
            useColumnFields={true}
            onNewButtonPress={() => {
                setFormFieldsTemp(tblFields);
            }}
        />
    );
};

export default B2Cbanners;
