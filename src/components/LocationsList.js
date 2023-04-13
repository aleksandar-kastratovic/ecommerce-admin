import { useEffect, useState } from "react";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { locationsListService } from "../helpers/services";
import useHttp from "../hooks/use-http";
import Loader from "./UI/Loader";

const LocationsList = ({ addTab }) => {
    const { isLoading, sendRequest: locationsRequest } = useHttp();

    const [locationsList, setLocationsList] = useState([]);

    useEffect(() => {
        const setLocations = async () => {
            const data = await locationsListService(locationsRequest);
            setLocationsList(data);
        };

        setLocations();
    }, [locationsRequest]);

    const rowEvents = {
        onClick: (e, row) => {
            addTab({
                eventKey: row.id,
                title: row.name,
                order: row.id + 1,
            });
        },
    };

    const columns = [
        {
            dataField: "id",
            text: "ID",
            sort: true,
            headerStyle: () => {
                return { width: "5%" };
            },
        },
        {
            dataField: "name",
            text: "Naziv",
            sort: true,
        },
        {
            dataField: "city",
            text: "Grad",
        },
        {
            dataField: "zip",
            text: "ZIP",
        },
        {
            dataField: "address",
            text: "Adresa",
        },
    ];

    return (
        <>
            <div className="row row-m0">
                <h4>Uloge</h4>
                <p className="text-muted">Locations represent warehouse locations.</p>
            </div>
            <div className="App dropdown-common-style table-row-hover">
                <BootstrapTable
                    bootstrap4
                    hover
                    keyField="id"
                    data={locationsList}
                    columns={columns}
                    rowEvents={rowEvents}
                    pagination={paginationFactory({ sizePerPage: 10, paginationSize: 14 })}
                    noDataIndication="Nema lokacija!"
                />
            </div>
            {isLoading && <Loader />}
        </>
    );
};

export default LocationsList;
