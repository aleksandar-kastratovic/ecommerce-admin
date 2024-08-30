import formFields from "../forms/seo.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";

const Seo = ({ pageId }) => {
    return (
        <ListPage
            listPageId="B2CStatiPagesSeo"
            apiUrl={`admin/static-pages-b2c/seo/${pageId}`}
            editUrl={`admin/static-pages-b2c/seo`}
            deleteUrl={`admin/static-pages-b2c/seo`}
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
