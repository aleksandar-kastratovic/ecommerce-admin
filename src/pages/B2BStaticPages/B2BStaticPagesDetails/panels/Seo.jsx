import formFields from "../forms/seo.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";

const Seo = ({ pageId }) => {
    return (
        <ListPage
            listPageId="ProductSeo"
            apiUrl={`admin/static-pages-b2b/seo/${pageId}`}
            editUrl={`admin/static-pages-b2b/seo`}
            deleteUrl={`admin/static-pages-b2b/seo`}
            title=" "
            columnFields={formFields}
            actionNewButton="modal"
            initialData={{ id_static_pages: pageId }}
            addFieldLabel="Dodajte novu vrednost"
            showAddButton={true}
        />
    );
};

export default Seo;
