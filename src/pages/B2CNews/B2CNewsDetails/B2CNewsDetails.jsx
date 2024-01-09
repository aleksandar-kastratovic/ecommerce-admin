import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import IconList from "../../../helpers/icons";
import Form from "../../../components/shared/Form/Form";
import basic_data from "./forms/basic_data.json";
import Gallery from "./panels/Gallery";
import Categories from "./panels/Categories";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import Seo from "./panels/Seo";
import TechnicalDoc from "./panels/TechnicalDoc";
import { getUrlQueryStringParam, setUrlQueryStringParam } from "../../../helpers/functions";
import AuthContext from "../../../store/auth-contex";

const B2CNewsDetails = () => {
    const { nid } = useParams();
    const authCtx = useContext(AuthContext);
    const { api } = authCtx;
    const apiPath = "admin/news-b2c/news/basic-data";
    const navigate = useNavigate();
    const activeTab = getUrlQueryStringParam("tab") ?? "basic";

    const init = {
        id: null,
        slug: null,
        name: null,
        title: null,
        subtitle: null,
        short_description: null,
        description: null,
        id_news_category: null,
        thumb_image: null,
    };

    const [data, setData] = useState(init);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingOnSubmit, setIsLoadingOnSubmit] = useState(false);

    const handleData = async () => {
        setIsLoading(true);
        api.get(`${apiPath}/${nid}`)
            .then((response) => {
                setData(response?.payload);
                setIsLoading(false);
            })
            .catch((error) => {
                console.warn(error);
                setIsLoading(false);
            });
    };

    const saveData = async (data) => {
        setIsLoadingOnSubmit(true);
        let oldId = data.id;
        api.post(apiPath, { ...data, image: data.thumb_image })
            .then((response) => {
                setData(response?.payload);
                toast.success("Uspešno");

                if (oldId === null) {
                    let tId = response?.payload?.id;
                    navigate(`/b2c-news/${tId}`, { replace: true });
                }
                setIsLoadingOnSubmit(false);
            })
            .catch((error) => {
                console.warn(error);
                toast.warning("Greška");
                setIsLoadingOnSubmit(false);
            });
    };

    useEffect(() => {
        handleData();
    }, []);

    const [formFieldsTemp, setFormFieldsTemp] = useState(basic_data);

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

    const fields = [
        {
            id: "basic",
            name: "Osnovno",
            icon: IconList.inventory,
            enabled: true,
            component: <Form formFields={formFieldsTemp} initialData={data} onSubmit={saveData} isLoading={isLoadingOnSubmit} apiPathCrop={`admin/news-b2c/category/basic-data/options/crop`} />,
        },
        {
            id: "gallery",
            name: "Galerija",
            icon: IconList.browseGallery,
            enabled: data?.id,
            component: <Gallery newsId={data?.id} apiPathCrop={`admin/news-b2c/news/gallery/options/crop`} />,
        },
        {
            id: "documentation",
            name: "Dokumentacija",
            icon: IconList.documentScanner,
            enabled: data?.id,
            component: <TechnicalDoc newsId={data?.id} apiPathCrop={`admin/news-b2c/news/technical-doc/options/crop`} />,
        },
        {
            id: "categories",
            name: "Kategorije",
            icon: IconList.category,
            enabled: data?.id,
            component: <Categories newsId={data?.id} />,
        },
        {
            id: "seo",
            name: "Seo",
            icon: IconList.search,
            enabled: data?.id,
            component: <Seo newsId={data?.id} />,
        },
    ];

    // Handle after click on tab panel
    const panelHandleSelect = (field) => {
        let queryString = setUrlQueryStringParam("tab", field.id);
        const id = data.id == null ? "new" : data.id;
        navigate(`/b2c-news/${id}?${queryString}`, { replace: true });
    };

    return (
        <>
            <DetailsPage title={data?.id == null ? "Nova vest" : data?.title} fields={fields} ready={[nid === "new" || data?.id]} selectedPanel={activeTab} panelHandleSelect={panelHandleSelect} />
        </>
    );
};

export default B2CNewsDetails;
