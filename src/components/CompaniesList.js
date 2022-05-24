import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { companyListService } from "../helpers/services";
import useHttp from "../hooks/use-http";
import Loader from "./UI/Loader";

const CompaniesList = ({ addTab }) => {

  const { isLoading, sendRequest: companiesRequest } = useHttp();

  const [companiesList, setCompaniesList] = useState([]);

  useEffect(() => {

    const setCompanies = async () => {
      const data = await companyListService(companiesRequest);
      setCompaniesList(data ?? []);
    };

    setCompanies();
  }, [companiesRequest]);

  const rowEvents = {
    onClick: (e, row) => {
      addTab(            {
        eventKey: row.id,
        title: row.company_name,
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
        return { width: "7%" };
      }
    },
    {
      dataField: "company_name",
      text: "Naziv firme",
      sort: true
    },
    {
      dataField: "tin",
      text: "PIB",
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
      dataField: "registry_number",
      text: "MB",
    }
  ];

  return (
    <>
      <div className="row row-m0">
        <h4>Kompanije</h4>
        <p className="text-muted">Companies represent Ecommerce buyers company.</p>
      </div>
      <div className="App dropdown-common-style table-row-hover">
        <BootstrapTable
          bootstrap4
          hover
          keyField="id"
          data={companiesList}
          columns={columns}
          rowEvents={ rowEvents }
          pagination={paginationFactory({ sizePerPage: 10, paginationSize: 14 })}
          noDataIndication="Nema kompanija!"
        />
      </div>
      {isLoading && (
        <Loader />
      )}
    </>
  );
}

export default CompaniesList;