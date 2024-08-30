import formFields from "../forms/seo.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";

const Seo = ({ newsId }) => {
    return (
        <ListPage
            listPageId="B2CNewsSeo"
            apiUrl={`admin/news-b2c/news/seo/${newsId}`}
            editUrl={`admin/news-b2c/news/seo`}
            deleteUrl={`admin/news-b2c/news/seo`}
            title=" "
            columnFields={formFields}
            actionNewButton="modal"
            initialData={{ id_news: newsId }}
            addFieldLabel="Dodajte novu vrednost"
            showAddButton={true}
        />
    );
};

export default Seo;
