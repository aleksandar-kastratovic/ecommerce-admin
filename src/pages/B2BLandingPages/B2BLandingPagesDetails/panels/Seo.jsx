import formFields from "../forms/seo.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";

const Seo = ({ pageId }) => {
    return (
        <ListPage
            listPageId="B2BLandingPageSeo"
            apiUrl={`admin/landing-pages-b2b/seo/${pageId}`}
            editUrl={`admin/landing-pages-b2b/seo`}
            deleteUrl={`admin/landing-pages-b2b/seo`}
            title=" "
            columnFields={formFields}
            actionNewButton="modal"
            initialData={{ id_landing_page: pageId }}
            addFieldLabel="Dodajte novu vrednost"
            showAddButton={true}
        />
    );
};

export default Seo;
