import { deleteBrand, getListBrands } from "./services";
import ListPage from "../../components/shared/ListPage/ListPage";

import tblFields from './tblFields.json'; 

const Brands = () => {
    return(
            <ListPage
                getData={getListBrands}
                deleteData={deleteBrand}
                title="Brendovi"
                showNewButton={true}
                newPath="/brands/new"
                columnFields={[tblFields]}
                showToolbar={true}
                editPath="/brands/"
                deleteTitle="Brisanje"
                deleteDescription="Da li ste sigurni da želite da obrišete?"
                showDatePicker={false}
            />
    )
};

export default Brands;