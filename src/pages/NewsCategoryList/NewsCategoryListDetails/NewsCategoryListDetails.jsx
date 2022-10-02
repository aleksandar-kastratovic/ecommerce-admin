import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAPI from "../../../api/api";
import Form from "../../../components/shared/Form/Form";
import DetailsPage from "../../../components/shared/ListPage/DetailsPage/DetailsPage";
import IconList from "../../../helpers/icons";

import formFields from "./formFields.json";
import SeoPanel from "./panels/SeoPanel";

const NewsCategoryListDetails = () => {
    const { cid } = useParams();
    const api = useAPI();
    const apiPath = "admin/news-b2c/category";

    const { data, isLoading } = useQuery(["newsCategory"], () => api.get(`${apiPath}/${cid}`).then((response) => response?.payload));

    const submitHandler = (data) => {
        api.post(apiPath, data)
            .then((response) => toast.success("Uspešno"))
            .catch((error) => {
                console.warn(error);
                toast.warn("Greška");
            });
    };
    const fields = [
        {
            name: "Osnovno",
            icon: IconList.category,
            enabled: true,
            component: <Form formFields={formFields} initialData={data} onSubmit={submitHandler} />,
        },
        {
            name: "Seo",
            icon: IconList.search,
            enabled: data?.id,
            component: <SeoPanel categoryId={data?.id} apiPath={apiPath} />,
        },
    ];
    console.log(data);

    return <DetailsPage title={data?.id == null ? "Unos nove kategorije" : data?.title} fields={fields} ready={!isLoading} />;
};

export default NewsCategoryListDetails;
