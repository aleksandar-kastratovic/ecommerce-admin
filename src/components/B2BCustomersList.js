import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { customersListService } from "../helpers/services";
import useHttp from "../hooks/use-http";
import Loader from "./UI/Loader";

const B2BCustomersList = ({ addTab }) => {

  const { isLoading, sendRequest: customersRequest } = useHttp();

  const [customersList, setCustomersList] = useState([]);

  useEffect(() => {

    const setCustomers = async () => {
      const data = await customersListService(customersRequest);
      setCustomersList(data ?? []);
    };

    setCustomers();
  }, [customersRequest]);

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

  return (
    <>
      <div className="row row-m0">
        <h4>B2B kupci</h4>
        <p className="text-muted">Customers represent Ecommerce buyers.</p>
      </div>
      <div className="App dropdown-common-style table-row-hover">
        <BootstrapTable
          bootstrap4
          hover
          keyField="id"
          data={customersList}
          columns={columns}
          rowEvents={ rowEvents }
          pagination={paginationFactory({ sizePerPage: 10 })}
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