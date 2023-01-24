import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAPI from "../../../api/api";
import Form from "../../../components/shared/Form/Form";
import IconList from "../../../helpers/icons";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import DetailsSeo from "./DetailsSeo/DetailsSeo";
import DetailsSpecification from "./DetailsSpecification/DetailsSpecification";

import formFields from "./formFields.json";
import DetailsDisplayIn from "./DetailsDisplayIn/DetailsDisplayIn";

const CategoriesDetails = () => {
    const { gid, cid } = useParams();
    const init = {
        id: null,
        name: null,
        slug: null,
        parent_id: null,
        image: null,
        icon: null,
        description: null,
        short_description: null,
        status: "on",
    };
    const [data, setData] = useState(init);
    const [isLoading, setIsLoading] = useState(false);
    const api = useAPI();
    const apiPath = "admin/category-product/categories";
    const navigate = useNavigate();

    const handleSubmit = (data) => {
        let oldId = data.id;
        api.post(apiPath, { ...data, id_category_product_groups: gid })
            .then((response) => {
                setData(response?.payload);
                toast.success("Uspešno");
                
                if (oldId === null) {
                    let tId = response?.payload?.id;
                    navigate(`/product-categories/category/${gid}/${tId}`, { replace: true });
                }
            })
            .catch((error) => {
                console.warn(error);
                toast.warning("Greška");
            });
    };

    const handleData = async () => {
        setIsLoading(true);
        api.get(`${apiPath}/${cid}`)
            .then((response) => {
                setData(response?.payload);
                setIsLoading(false);
            })
            .catch((error) => {
                console.warn(error);
                setIsLoading(false);
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
            component: <Form formFields={formFields} initialData={data} onSubmit={handleSubmit} queryString={`id_category_product_groups=${gid}&id_category_product=${data?.id}`} />,
        },
        {
            name: "Seo",
            icon: IconList.search,
            enabled: data?.id,
            component: <DetailsSeo cid={data?.id} gid={gid} />,
        },
        {
            name: "Prikaz",
            icon: IconList.displaySettings,
            enabled: data?.id,
            component: <DetailsDisplayIn cid={data?.id} />,
        },
        /* 
            Specifikacija za kategoriju se ne koristi pa je zbog toga sakrivena
        {
            name: "Specifikacija",
            icon: "settings",
            enabled: data?.id,
            component: <DetailsSpecification cid={data?.id} gid={gid} />,
        }, */
    ];

    return <DetailsPage title={data?.id == null ? "Unos nove kategorije" : data?.name} fields={fields} ready={!isLoading} />;
};

export default CategoriesDetails;
