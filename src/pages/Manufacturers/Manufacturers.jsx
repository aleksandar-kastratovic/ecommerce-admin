import { deleteManufacturer, getListManufacturers } from "./services";
import ListPage from "../../components/shared/ListPage/ListPage";

import tblFields from './tblFields.json'; 

const Manufacturers = () => {
    return(
        <ListPage apiUrl="admin/manufacturers" title="Proizvođači" columnFields={tblFields} />
    )
};

export default Manufacturers;