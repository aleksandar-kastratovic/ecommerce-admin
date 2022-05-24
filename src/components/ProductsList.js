import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { productsListService } from "../helpers/services";
import useHttp from "../hooks/use-http";
import Loader from "./UI/Loader";
import noImage from "./../assets/images/no-image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { currencyFormat } from "../helpers/functions";

const ProductsList = ({ productSelected }) => {

    const { isLoading, sendRequest: productsListRequest } = useHttp();

    const [productsList, setProductsList] = useState([]);
  
    useEffect(() => {
  
      const setProducts = async () => {
        const data = await productsListService(productsListRequest);
        setProductsList(data);
      };
  
      setProducts();
    }, [productsListRequest]);

    function imgFormatter(cell) {
      if (cell) {
        return (
          <div className="d-flex justify-content-start overflow-hidden">
            <img style={ { maxHeight: 50 }} className="img-fluid" src={cell} alt={cell} />
          </div>
        );
      }
    
      return (
        <div className="d-flex justify-content-start">
          <img style={ { maxHeight: 50 }} className="img-fluid" src={noImage} alt={noImage} />
        </div>
      );
    }

    function statusFormatter(cell) {
      if (cell) {
        return (
          <div className="d-flex justify-content-start overflow-hidden align-items-center">
            <p className="m-0 pe-1">Vidljivo</p><FontAwesomeIcon icon={faEye} />
          </div>
        );
      }
    
      return (
        <div className="d-flex justify-content-start align-items-center">
          <p className="m-0 pe-1">Nevidljivo</p><FontAwesomeIcon icon={faEyeSlash} />
        </div>
      );
    }

    function priceFormatter(cell) {
      return (
        <span>{currencyFormat(cell) + " RSD"}</span>
      );
    }

    const rowEvents = {
      onClick: (e, row) => {
        productSelected(row.id);
      }
    };
        
    const columns = [
      {
        dataField: "image_url",
        text: "Slika",
        formatter: imgFormatter,
        headerStyle: () => {
          return { width: "8%" };
        }
      },
      {
        dataField: "name",
        text: "Naziv proizvoda",
        sort: true,
        events: {
          onClick: (e, column, columnIndex, row) => {
            productSelected(row.id);
          }
        },
        headerStyle: () => {
          return { width: "30%" };
        }
      },
      {
        dataField: "price",
        text: "Cena",
        formatter: priceFormatter
      },
      {
        dataField: "code",
        text: "Šifra"
      },
      {
        dataField: "is_view",
        text: "Status",
        formatter: statusFormatter,
      }
    ];
  
    return (
      <>
        <div className="App dropdown-common-style products-table table-row-hover">
          <BootstrapTable
            bootstrap4
            hover
            keyField="id"
            data={productsList}
            columns={columns}
            rowEvents={ rowEvents }
            pagination={paginationFactory({ sizePerPage: 10, paginationSize: 14 })}
            noDataIndication="Nema proizvoda!"
          />
        </div>
        {isLoading && (
          <Loader />
        )}
      </>
    );

}

export default ProductsList;
