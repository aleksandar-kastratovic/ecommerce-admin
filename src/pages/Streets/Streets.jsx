import { deleteStreet, getListStreets } from "./services";
import ListPage from "../../components/shared/ListPage/ListPage";

import tblFields from './tblFields.json'; 

const Streets = () => {
    return(
            <ListPage
                getData={getListStreets}
                deleteData={deleteStreet}
                title="Ulice"
                showNewButton={true}
                newPath="/streets/new"
                columnFields={[tblFields]}
                showToolbar={true}
                editPath="/streets/"
                deleteTitle="Brisanje"
                deleteDescription="Da li ste sigurni da želite da obrišete?"
                showDatePicker={false}
            />
    )
};

export default Streets;