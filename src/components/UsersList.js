import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { userListService } from "../helpers/services";
import useHttp from "../hooks/use-http";
import Loader from "./UI/Loader";

const UsersList = ({addTab}) => {

  const { isLoading, sendRequest: usersListRequest } = useHttp();

  const [usersList, setUsersList] = useState([]);

  useEffect(() => {

    const setUsers = async () => {
      const data = await userListService(usersListRequest);
      setUsersList(data);
    };

    setUsers();
  }, [usersListRequest]);

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
      dataField: "full_name",
      text: "Ime i prezime",
      sort: true
    },
    {
      dataField: "email",
      text: "Mail"
    },
    {
      dataField: "phone",
      text: "Telefon"
    },
    {
      dataField: "role_name",
      text: "Uloga",
      headerStyle: () => {
        return { width: "10%" };
      }
    }
  ];

  return (
    <>
      <div className="row row-m0">
        <h4>Korisnici</h4>
        <p className="text-muted">Users represent admin panel users.</p>
      </div>
      <div className="App dropdown-common-style table-row-hover">
        <BootstrapTable
          bootstrap4
          hover
          keyField="id"
          data={usersList}
          columns={columns}
          rowEvents={ rowEvents }
          pagination={paginationFactory({ sizePerPage: 10 })}
          noDataIndication="Nema korisnika!"
        />
      </div>
      {isLoading && (
        <Loader />
      )}
    </>
  );
}

export default UsersList;