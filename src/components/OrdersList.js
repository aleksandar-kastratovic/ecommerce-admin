import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { currencyFormat } from "../helpers/functions";
import { ordersListService } from "../helpers/services";
import useHttp from "../hooks/use-http";
import Loader from "./UI/Loader";

const OrdersList = ({ addTab }) => {

  const { isLoading, sendRequest: ordersRequest } = useHttp();

  const [oredrsList, setOrdersList] = useState([]);

  const [search, setSearch] = useState('');

  const setOrders = async () => {
    const data = await ordersListService({search: search}, ordersRequest);
    setOrdersList(data ?? []);
  };

  const rowEvents = {
    onClick: (e, row) => {
      addTab(            {
        eventKey: row.id,
        title: row.order_name,
        order: row.id + 1
      });
    }
  };

  function priceFormatter(cell) {
    return (
      <span>{currencyFormat(cell) + " RSD"}</span>
    );
  }
   
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
      dataField: "order_name",
      text: "Broj porudžbine",
      sort: true
    },
    {
      dataField: "company_name",
      text: "Kupac",
    },
    {
      dataField: "total_price",
      text: "	Ukupno za naplatu",
      formatter: priceFormatter
    },
    {
      dataField: "status_name",
      text: "Status",
    },
    {
      dataField: "created_at",
      text: "Vreme kreiranja",
    }
  ];

  useEffect(() => {
    const timeOutId = setTimeout(() => setOrders(), 500);
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
                    placeholder="Pretražite porudžbine..."
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
          data={oredrsList}
          columns={columns}
          rowEvents={ rowEvents }
          pagination={paginationFactory({ sizePerPage: 10, paginationSize: 14 })}
          noDataIndication="Nema porudžbina!"
        />
      </div>
      {isLoading && (
        <Loader />
      )}
    </>
  );
}

export default OrdersList;