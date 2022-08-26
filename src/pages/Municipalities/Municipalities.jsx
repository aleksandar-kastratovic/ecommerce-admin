import { deleteMunicipality, getListMunicipalities } from "./services";
import ListPage from "../../components/shared/ListPage/ListPage";

const Municipalities = () => {
    return(
        <ListPage
                getData={getListMunicipalities}
                deleteData={deleteMunicipality}
                title="Opštine"
                showNewButton={true}
                newPath="/municipalities/new"
                columnFields={[]}
                showToolbar={true}
                editPath="/municipalities/"
                deleteTitle="Brisanje"
                deleteDescription="Da li ste sigurni da želite da obrišete?"
                showDatePicker={false}
            />
    )
};

export default Municipalities;