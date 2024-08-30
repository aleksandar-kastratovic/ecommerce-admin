import formFields from "../forms/seo.json";
import ListPage from "../../../../components/shared/ListPage/ListPage";

const Seo = ({ pageId }) => {
    return (
        <ListPage
            listPageId="B2CLandingPageSeo"
            apiUrl={`admin/landing-pages-b2c/seo/${pageId}`}
            editUrl={`admin/landing-pages-b2c/seo`}
            deleteUrl={`admin/landing-pages-b2c/seo`}
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
