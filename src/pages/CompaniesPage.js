import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CompaniesList from "../components/CompaniesList";
import CompanyDetails from "../components/CompanyDetails";
import AddCompanyModal from "../components/UI/AddCompanyModal";
import Loader from "../components/UI/Loader";
import Tabs from "../components/UI/Tabs";
import { addTabName } from "../helpers/functions";
import { getCompanyService, removeCompanyService, saveCompanyService } from "../helpers/services";
import useHttp from "../hooks/use-http";

const CompaniesPage = () => {
    let initTab = [
        {
            eventKey: 0,
            title: "Lista Kompanija",
            order: 1,
        },
    ];
    let { comId } = useParams();
    if (+comId > 0) {
        initTab.push({
            eventKey: +comId,
            title: " ",
            order: +comId + 1,
        });
    }

    let navigate = useNavigate();
    const { isLoading, sendRequest: companyRequest } = useHttp();
    const [activeTab, setActiveTab] = useState(initTab[1] && initTab[1].eventKey ? initTab[1].eventKey : initTab[0].eventKey);
    const [show, setShow] = useState(false);
    const [tabsList, setTabsList] = useState(initTab);
    const [companyDetailsData, setCompanyDetailsData] = useState({});

    const addTabData = (tabData) => {
        for (const elem in tabsList) {
            if (tabsList[elem] !== undefined) {
                if (tabsList[elem].eventKey === tabData.eventKey) {
                    if (tabData.eventKey !== activeTab) {
                        setActiveTab(tabData.eventKey);
                        navigate(`/companies/` + tabData.eventKey);
                    }
                    return;
                }
            }
        }
        tabData.order = tabsList[tabsList.length - 1].order + 1;
        setTabsList((oldArray) => [...oldArray, tabData]);
        setActiveTab(tabData.eventKey);
        navigate(`/companies/` + tabData.eventKey);
    };

    const addCompanyTabName = (tabData) => {
        const data = addTabName(tabsList, tabData);
        if (data) {
            setTabsList(data);
        }
    };

    const removeTabData = (tabEventKey) => {
        setTabsList(tabsList.filter((item) => item.eventKey !== tabEventKey));
        if (tabEventKey === activeTab) {
            setActiveTab(initTab[0].eventKey);
            navigate(`/companies/` + initTab[0].eventKey);
        }
    };

    const saveCompanyResponse = (companyData) => {
        if (companyData.id === activeTab) {
            setCompanyDetailsData(companyData);
        }
        if (companyData.id && companyData.company_name) {
            const tabData = {
                eventKey: companyData.id,
                title: companyData.company_name,
                order: companyData.id + 1,
            };
            addTabData(tabData);
        } else {
            setActiveTab(initTab[0].eventKey - 1);
            setActiveTab(initTab[0].eventKey);
        }
    };

    const saveCompany = async (saveData) => {
        const data = await saveCompanyService(saveData, companyRequest);
        if (data) {
            saveCompanyResponse(data);
        }
    };

    useEffect(() => {
        if (activeTab > 0) {
            const setCompanyData = (companyData) => {
                let setCorrectly = false;
                for (const item in tabsList) {
                    if (item !== undefined && tabsList[item].eventKey === companyData.id && tabsList[item].title == companyData.company_name) {
                        setCorrectly = true;
                    }
                }
                if (!setCorrectly) {
                    addCompanyTabName(companyData);
                }
                setCompanyDetailsData(companyData);
            };

            const getCompany = async () => {
                const data = await getCompanyService({ id: activeTab }, companyRequest);
                if (data) {
                    setCompanyData(data);
                }
            };

            getCompany();
        }
    }, [activeTab]);

    const removeCompany = async (companyId) => {
        const removeCompanyResponse = (data) => {
            removeTabData(companyId);
        };

        const data = await removeCompanyService({ id: activeTab }, companyRequest);

        removeCompanyResponse(data);
    };

    return (
        <>
            <section id="roles-page" className="card">
                <div className="tabs-container">
                    <Tabs
                        tabsData={tabsList}
                        activeTabKey={activeTab}
                        onTabChange={(activeTabKey) => {
                            setActiveTab(activeTabKey);
                            navigate(`/companies/` + activeTabKey);
                        }}
                        removeTab={(tabEventKey) => {
                            removeTabData(tabEventKey);
                        }}
                    />
                    <button
                        type="button"
                        className="btn-control button-add"
                        onClick={() => {
                            setShow(true);
                        }}
                    >
                        Nova kompanija
                    </button>
                </div>
                <AddCompanyModal
                    openModal={show}
                    handleClose={() => {
                        setShow(false);
                    }}
                    saveCompany={(dataForSave) => {
                        saveCompany(dataForSave);
                    }}
                />
                {activeTab === initTab[0].eventKey && (
                    <CompaniesList
                        addTab={(tabData) => {
                            addTabData(tabData);
                        }}
                    />
                )}
                {activeTab !== initTab[0].eventKey && (
                    <CompanyDetails
                        companyData={companyDetailsData}
                        saveCompany={(dataForSave) => {
                            saveCompany(dataForSave);
                        }}
                        removeCompany={(id) => {
                            removeCompany(id);
                        }}
                    />
                )}
            </section>
            {isLoading && <Loader />}
        </>
    );
};

export default CompaniesPage;
