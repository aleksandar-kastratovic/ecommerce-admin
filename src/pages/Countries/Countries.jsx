import { deleteCountry, getListCountries } from "./services";
import ListPage from "../../components/shared/ListPage/ListPage";

import tblFields from "./tblFields.json";

const Countries = () => {
  return (
    <ListPage
      getData={getListCountries}
      deleteData={deleteCountry}
      title="Države"
      showNewButton={true}
      newPath="/countries/new"
      columnFields={tblFields}
      showToolbar={true}
      editPath="/countries/"
      deleteTitle="Brisanje"
      deleteDescription="Da li ste sigurni da želite da obrišete?"
      showDatePicker={false}
    />
  );
};

export default Countries;
