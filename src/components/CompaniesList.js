import { useEffect, useState } from "react";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { companyListService } from "../helpers/services";
import useHttp from "../hooks/use-http";
import Loader from "./UI/Loader";

const CompaniesList = ({ addTab }) => {
    const { isLoading, sendRequest: companiesRequest } = useHttp();

    const [companiesList, setCompaniesList] = useState([]);

    const [search, setSearch] = useState("");

    const setCompanies = async () => {
        const data = await companyListService({ search: search }, companiesRequest);
        setCompaniesList(data ?? []);
    };

    const rowEvents = {
        onClick: (e, row) => {
            addTab({
                eventKey: row.id,
                title: row.company_name,
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
                return { width: "7%" };
            },
        },
        {
            dataField: "company_name",
            text: "Naziv firme",
            sort: true,
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
        },
    ];

    useEffect(() => {
        const timeOutId = setTimeout(() => setCompanies(), 500);
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
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                        }}
                                        type="text"
                                        className="form-control"
                                        id="searchInput"
                                        aria-describedby="search"
                                        placeholder="Pretražite kompanije..."
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
                    data={companiesList}
                    columns={columns}
                    rowEvents={rowEvents}
                    pagination={paginationFactory({
                        sizePerPage: 10,
                        paginationSize: 14,
                    })}
                    noDataIndication="Nema kompanija!"
                />
            </div>
            {isLoading && <Loader />}
        </>
    );
};

export default CompaniesList;
