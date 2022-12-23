import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAPI from "../../../api/api";
import IconList from "../../../helpers/icons";
import Form from "../../../components/shared/Form/Form";
import basic_data from "./forms/basic_data.json";
import Gallery from "./panels/Gallery";
import Categories from "./panels/Categories";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import Seo from "./panels/Seo";
import TechnicalDoc from "./panels/TechnicalDoc";

const NewsDetails = () => {
    const { nid } = useParams();
    console.log(nid);
    const api = useAPI();
    const apiPath = "admin/news-b2c/news/basic-data";

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

    const handleData = async () => {
        setIsLoading(true);
        api.get(`${apiPath}/${nid}`)
            .then((response) => {
                setData(response?.payload);
                console.log(response?.payload);
                setIsLoading(false);
            })
            .catch((error) => {
                console.warn(error);
                setIsLoading(false);
            });
    };

    const saveData = async (data) => {
        api.post(apiPath, { ...data, image: data.thumb_image })
            .then((response) => {
                setData(response?.payload);
                toast.success("Uspešno");
            })
            .catch((error) => {
                console.warn(error);
                toast.warning("Greška");
            });
    };

    useEffect(() => {
        handleData();
    }, []);

    const fields = [
        {
            name: "Osnovno",
            icon: IconList.inventory,
            enabled: true,
            component: <Form formFields={basic_data} initialData={data} onSubmit={saveData} />,
        },
        {
            name: "Galerija",
            icon: IconList.browseGallery,
            enabled: data?.id,
            component: <Gallery newsId={data?.id} />,
        },
        {
            name: "Kategorije",
            icon: IconList.category,
            enabled: data?.id,
            component: <Categories newsId={data?.id} />,
        },
        {
            name: "Seo",
            icon: IconList.search,
            enabled: data?.id,
            component: <Seo newsId={data?.id} />,
        },
        {
            name: "Dokumentacija",
            icon: IconList.documentScanner,
            enabled: data?.id,
            component: <TechnicalDoc newsId={data?.id} />,
        },
    ];

    return <DetailsPage title={data?.id == null ? "Nova vest" : data?.title} fields={fields} ready={[nid === "new" || data?.id]} />;
};

export default NewsDetails;
