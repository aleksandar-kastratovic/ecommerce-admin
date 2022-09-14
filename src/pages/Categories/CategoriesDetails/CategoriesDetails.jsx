import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAPI from "../../../api/api";
import Form from "../../../components/shared/Form/Form";
import IconList from "../../../helpers/icons";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import LoadingForm from "../../../components/shared/Loading/LoadingForm";
import DetailsSeo from "./DetailsSeo/DetailsSeo";
import DetailsSpecification from "./DetailsSpecification/DetailsSpecification";

import formFields from "./formFields.json";

const CategoriesDetails = () => {
    const { gid, cid } = useParams();
    const init = {
        id: null,
        name: null,
        slug: null,
        parent_id: null,
        image: null,
        icon: null,
        status: "on",
    };
    const [data, setData] = useState(init);
    const [isLoading, setIsLoading] = useState(false);
    const api = useAPI();

    const handleSubmit = (data) => {
        api.post("admin/category_product/categories/", { ...data, id_category_product_groups: gid })
            .then((response) => {
                setData(response?.payload);
                toast.success("Uspešno");
            })
            .catch((error) => {
                console.warn(error);
                toast.warning("Greška");
            });
    };

    const handleData = async () => {
        setIsLoading(true);
        await api
            .get(`admin/category_product/categories/${cid}`)
            .then((response) => {
                setData(response?.payload);
            })
            .catch((error) => {
                console.warn(error);
            });
        setIsLoading(false);
    };

    useEffect(() => {
        handleData();
    }, []);

    const fields = [
        {
            name: "Osnovno",
            icon: IconList.category,
            enabled: true,
            component: (
                <div>
                    {!isLoading ? (
                        <Form formFields={formFields} initialData={data} onSubmit={handleSubmit} queryString={`id_category_product_groups=${gid}&id_category_product=${cid}`} />
                    ) : (
                        <LoadingForm fields={formFields.length} />
                    )}
                </div>
            ),
        },
        {
            name: "Seo",
            icon: IconList.search,
            enabled: data?.id,
            component: <DetailsSeo cid={cid} gid={gid} />,
        },
        {
            name: "Specifikacija",
            icon: "settings",
            enabled: data?.id,
            component: <DetailsSpecification cid={cid} gid={gid} />,
        },
    ];

    return <DetailsPage title={data?.id == null ? "Unos nove kategorije" : data?.name} fields={fields} />;
};

export default CategoriesDetails;
