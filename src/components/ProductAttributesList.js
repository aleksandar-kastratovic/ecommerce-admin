import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { productAttributesListService } from "../helpers/services";
import useHttp from "../hooks/use-http";
import Loader from "./UI/Loader";

const ProductAttributesList = ({ addTab }) => {

  const { isLoading, sendRequest: productAttributeListRequest } = useHttp();

  const [productAttributeList, setProductAttributeList] = useState([]);

  useEffect(() => {

    const setProdcutAttribute = async () => {
      const data = await productAttributesListService(productAttributeListRequest);
      setProductAttributeList(data);
    };

    setProdcutAttribute();
  }, [productAttributeListRequest]);

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
      dataField: "attribute_name",
      text: "Naziv",
      sort: true
    },
    {
      dataField: "attribute_values",
      text: "Atributi",
      formatter: screensFormatter
    }
  ];

  const rowEvents = {
    onClick: (e, row) => {
      addTab(            {
        eventKey: row.id,
        title: row.name,
        order: row.id + 1
      });
    }
  };

  return (
    <>
      <div className="row row-m0">
        <h4>Uloge</h4>
        <p className="text-muted">Lista atributa proizvoda.</p>
      </div>
      <div className="App dropdown-common-style table-row-hover">
        <BootstrapTable
          bootstrap4
          hover
          keyField="id"
          data={productAttributeList}
          columns={columns}
          rowEvents={ rowEvents }
          pagination={paginationFactory({ sizePerPage: 10 })}
          noDataIndication="Nema atributa proizvoda!"
        />
      </div>
      {isLoading && (
        <Loader />
      )}
    </>
  );
}

export default ProductAttributesList;