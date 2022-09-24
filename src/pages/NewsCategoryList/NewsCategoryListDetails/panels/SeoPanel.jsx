import { useQuery } from "react-query";
import useAPI from "../../../../api/api";

const SeoPanel = ({ apiPath, categoryId }) => {
    const api = useAPI;

    const { data: seo, isLoading: isSeoLoading } = useQuery(["seoNewsCategory"], () => api.get(`${apiPath}/seo/${categoryId}`).then((response) => response?.payload));
    console.log(seo);

    return <div>seo</div>;
};

export default SeoPanel;
