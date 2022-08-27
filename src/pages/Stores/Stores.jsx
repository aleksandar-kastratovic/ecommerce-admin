import { deleteStore, getListStores } from "./services";
import ListPage from "../../components/shared/ListPage/ListPage";

import tblFields from './tblFields.json'; 

const Stores = () => {
    return(
            <ListPage
                getData={getListStores}
                deleteData={deleteStore}
                title="Skladišta"
                showNewButton={true}
                newPath="/stores/new"
                columnFields={[tblFields]}
                showToolbar={true}
                editPath="/stores/"
                deleteTitle="Brisanje"
                deleteDescription="Da li ste sigurni da želite da obrišete?"
                showDatePicker={false}
            />
    )
};

export default Stores;