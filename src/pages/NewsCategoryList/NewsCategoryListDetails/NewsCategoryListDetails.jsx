import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAPI from "../../../api/api";
import Form from "../../../components/shared/Form/Form";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import IconList from "../../../helpers/icons";

import formFields from "./formFields.json";
import Seo from "./panels/Seo";

const NewsCategoryListDetails = () => {
    // const { cid } = useParams();
    // const api = useAPI();
    // const apiPath = "admin/news-b2c/category/basic-data";

    // const { data, isLoading } = useQuery(["newsCategory"], () => api.get(`${apiPath}/${cid}`).then((response) => response?.payload));

    // const submitHandler = (data) => {
    //     api.post(apiPath, { ...data, image: data.thumb_image })
    //         .then((response) => {
    //             toast.success("Uspešno");
    //         })
    //         .catch((error) => {
    //             console.warn(error);
    //             toast.warn("Greška");
    //         });
    // };
    const { cid } = useParams();
    // console.log(cid);
    const api = useAPI();
    const apiPath = "admin/news-b2c/category/basic-data";

    const init = {
        id: null,
        slug: null,
        name: null,
        image: null,
        thumb_image: null,
        short_description: null,
        description: null,
        parent_id: null,
        category_path: null,
    };

    const [data, setData] = useState(init);
    const [isLoading, setIsLoading] = useState(false);

    const handleData = async () => {
        setIsLoading(true);
        api.get(`${apiPath}/${cid}`)
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
            icon: IconList.category,
            enabled: true,
            component: <Form formFields={formFields} initialData={data} onSubmit={saveData} />,
        },
        {
            name: "Seo",
            icon: IconList.search,
            enabled: data?.id,
            component: <Seo categoryId={data?.id} />,
        },
    ];

    return <DetailsPage title={data?.id == null ? "Unos nove kategorije" : data?.name} fields={fields} ready={!isLoading} />;
};

export default NewsCategoryListDetails;
