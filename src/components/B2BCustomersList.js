import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { customersListService } from "../helpers/services";
import useHttp from "../hooks/use-http";
import Loader from "./UI/Loader";

const B2BCustomersList = ({ addTab }) => {

  const { isLoading, sendRequest: customersRequest } = useHttp();

  const [customersList, setCustomersList] = useState([]);

  const [search, setSearch] = useState('');

  const setCustomers = async () => {
    const data = await customersListService({search: search}, customersRequest);
    setCustomersList(data ?? []);
  };

  const rowEvents = {
    onClick: (e, row) => {
      addTab(            {
        eventKey: row.id,
        title: row.full_name,
        order: row.id + 1
      });
    }
  };
   
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      headerStyle: () => {
        return { width: "5%" };
      }
    },
    {
      dataField: "full_name",
      text: "Ime i prezime",
      sort: true
    },
    {
      dataField: "phone",
      text: "Telefon",
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "company_name",
      text: "Naziv firme",
    },
    {
      dataField: "tin",
      text: "PIN",
    },
    {
      dataField: "registry_number",
      text: "MB",
    }
  ];

  useEffect(() => {
    const timeOutId = setTimeout(() => setCustomers(), 500);
    return () => clearTimeout(timeOutId);
  }, [search]);

  return (
    <>
      <div className="App dropdown-common-style table-row-hover">
        <div className="statistics-box-holder">
          <h4>Pretraga</h4>
          <div className="filters-box-holder">
            <div className="row">
              <div className="col-xl-3">
                <div className="form-group">
                  <input
                    onChange={ (e) => { setSearch(e.target.value) }}
                    type="text"
                    className="form-control"
                    id="searchInput"
                    aria-describedby="search"
                    placeholder="Pretražite kupce..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <BootstrapTable
          bootstrap4
          hover
          keyField="id"
          data={customersList}
          columns={columns}
          rowEvents={ rowEvents }
          pagination={paginationFactory({ sizePerPage: 10, paginationSize: 14 })}
          noDataIndication="Nema kupaca!"
        />
      </div>
      {isLoading && (
        <Loader />
      )}
    </>
  );
}

export default B2BCustomersList;