import { deleteManufacturer, getListManufacturers } from "./services";
import ListPage from "../../components/shared/ListPage/ListPage";

import tblFields from './tblFields.json'; 

const Manufacturers = () => {
    return(
            <ListPage
                getData={getListManufacturers}
                deleteData={deleteManufacturer}
                title="Proizvođači"
                showNewButton={true}
                newPath="/manufacturers/new"
                columnFields={[tblFields]}
                showToolbar={true}
                editPath="/manufacturers/"
                deleteTitle="Brisanje"
                deleteDescription="Da li ste sigurni da želite da obrišete?"
                showDatePicker={false}
            />
    )
};

export default Manufacturers;