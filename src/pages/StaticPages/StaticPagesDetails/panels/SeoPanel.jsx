import { useQuery } from "react-query";
import useAPI from "../../../../api/api";

const SeoPanel = ({ apiPath, spid }) => {
    const api = useAPI();

    const { data: seo, isLoading: isSeoLoading } = useQuery(["seoStaticPage"], () => api.get(`${apiPath}/seo/${spid}`).then((response) => response?.payload));
    console.log(seo);

    return <div>seo</div>;
};

export default SeoPanel;
