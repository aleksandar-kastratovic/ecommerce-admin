import { deleteTown, getListTowns } from "./services";
import ListPage from "../../components/shared/ListPage/ListPage";

import tblFields from './tblFields.json'; 

const Towns = () => {
    return(
            <ListPage
                getData={getListTowns}
                deleteData={deleteTown}
                title="Mesta"
                showNewButton={true}
                newPath="/towns/new"
                columnFields={[tblFields]}
                showToolbar={true}
                editPath="/towns/"
                deleteTitle="Brisanje"
                deleteDescription="Da li ste sigurni da želite da obrišete?"
                showDatePicker={false}
            />
    )
};

export default Towns;