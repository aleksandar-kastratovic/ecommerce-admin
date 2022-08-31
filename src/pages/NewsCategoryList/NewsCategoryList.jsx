import ListPage from "../../components/shared/ListPage/ListPage";
import tblFields from './tblFields.json'; 



const NewsCategorylist = () => {
    
    return(
        <ListPage apiUrl="admin/news_b2c/b2c_news" title="Kategorije vesti" columnFields={tblFields}/>
    )
};

export default NewsCategorylist;