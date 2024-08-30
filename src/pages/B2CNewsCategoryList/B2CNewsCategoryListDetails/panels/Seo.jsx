import formFields from "../forms/seo.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";

const Seo = ({ categoryId }) => {
    return (
        <ListPage
            listPageId="B2CNewsCategoriesSeo"
            apiUrl={`admin/news-b2c/category/seo/${categoryId}`}
            editUrl={`admin/news-b2c/category/seo`}
            deleteUrl={`admin/news-b2c/category/seo`}
            title=" "
            columnFields={formFields}
            actionNewButton="modal"
            initialData={{ id_category_news: categoryId }}
            addFieldLabel="Dodajte novu vrednost"
            showAddButton={true}
        />
    );
};

export default Seo;
