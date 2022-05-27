import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { rolesListService } from "../helpers/services";
import useHttp from "../hooks/use-http";
import Loader from "./UI/Loader";

const RolesList = ({ addTab }) => {

  const { isLoading, sendRequest: rolesListRequest } = useHttp();

  const [rolesList, setRolesList] = useState([]);

  useEffect(() => {

    const setRoles = async () => {
      const data = await rolesListService(rolesListRequest);
      setRolesList(data ?? []);
    };

    setRoles();
  }, [rolesListRequest]);

  function screensFormatter(cell) {
    let formattedScreens = '';
    if (cell instanceof Array) {
      for (const i in cell) {
        if (i !== undefined ) {
          if (i > 0) {
            formattedScreens = formattedScreens + ', ' + cell[i];
          } else {
            formattedScreens = formattedScreens + cell[i];
          }
        }
      }
    } else {
      formattedScreens = cell;
    }

    return (
      <span>{ formattedScreens }</span>
    );
  }
   
  const rowEvents = {
    onClick: (e, row) => {
      addTab(            {
        eventKey: row.id,
        title: row.name,
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
      },
      classes: 'linked-td'
    },
    {
      dataField: "name",
      text: "Naziv",
      sort: true
    },
    {
      dataField: "screen",
      text: "Ekrani",
      formatter: screensFormatter
    }
  ];

  return (
    <>
      <div className="row row-m0">
        <h4>Uloge</h4>
      </div>
      <div className="App dropdown-common-style table-row-hover">
        <BootstrapTable
          bootstrap4
          hover
          keyField="id"
          data={rolesList}
          rowEvents={ rowEvents }
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 10, paginationSize: 14 })}
          noDataIndication="Nema rola!"
        />
      </div>
      {isLoading && (
        <Loader />
      )}
    </>
  );
}

export default RolesList;