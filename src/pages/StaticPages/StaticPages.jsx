import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from "./StaticPagesListFields.json";


const StaticPages = () => {
    
    return(
        <ListPage apiUrl="admin/static-pages-b2c/page" title="Statičke strane" columnFields={tblFields}/>
    )
};

export default StaticPages;
