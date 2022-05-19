import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import B2BCustomerDetails from "../components/B2BCustomerDetails";
import B2BCustomersList from "../components/B2BCustomersList";
import AddB2BCustomerModal from "../components/UI/AddB2BCustomerModal";
import Loader from "../components/UI/Loader";
import Tabs from "../components/UI/Tabs";
import { addTabName } from "../helpers/functions";
import { companyListService, getCustomerService, removeCustomerService, saveCustomerService } from "../helpers/services";
import useHttp from "../hooks/use-http";

const B2BCustomersPage = () => {

    let initTab = [
        {
            eventKey: 0,
            title: "Lista B2B Kupaca",
            order: 1
        }
    ];
    let { cusId } = useParams();
    if (+cusId > 0) {
        initTab.push({
            eventKey: +cusId,
            title: ' ',
            order: +cusId + 1
        });
    };

    let navigate = useNavigate();
    const [companyList, setCompanyList] = useState([]);
    const { isLoading, sendRequest: customersRequest } = useHttp();
    const [activeTab, setActiveTab] = useState((initTab[1] && initTab[1].eventKey) ? initTab[1].eventKey : initTab[0].eventKey);
    const [show, setShow] = useState(false);
    const [tabsList, setTabsList] = useState(initTab);
    const [customerDetailsData, setCustomerDetailsData] = useState({});

    const getCompanies = async () => {
        const data = await companyListService(customersRequest);
        setCompanyList(data);
    };

    useEffect(() => {

        getCompanies();

    }, [customersRequest]);

    const addTabData = (tabData) => {
        for (const elem in tabsList) {
            if (tabsList[elem] !== undefined) {
                if (tabsList[elem].eventKey === tabData.eventKey) {
                    if (tabData.eventKey !== activeTab) {
                        setActiveTab(tabData.eventKey);
                        navigate(`/b2b-customers/`+ tabData.eventKey);
                    }
                    return;
                }
            }
        }
        tabData.order = tabsList[tabsList.length -1].order + 1;
        setTabsList(oldArray => [...oldArray, tabData]);
        setActiveTab(tabData.eventKey);
        navigate(`/b2b-customers/`+ tabData.eventKey);
    }

    const addCustomerTabName = (tabData) => {
        const data = addTabName(tabsList, tabData);
        if (data) {
            setTabsList(data);
        }
    }

    const removeTabData = (tabEventKey) => {
        setTabsList(tabsList.filter(item => item.eventKey !== tabEventKey));
        if (tabEventKey === activeTab) {
            setActiveTab(initTab[0].eventKey);
            navigate(`/b2b-customers/`+ initTab[0].eventKey);
        }
    }

    const saveCustomerResponse = (customerData) => {
        if (customerData.id === activeTab) {
            setCustomerDetailsData(customerData);
        }
        if ( customerData.id && customerData.full_name) {
            const tabData = {
                eventKey: customerData.id,
                title: customerData.full_name,
                order: customerData.id + 1
            };
            addTabData(tabData);
        } else {
            setActiveTab(initTab[0].eventKey - 1);
            setActiveTab(initTab[0].eventKey);
        }
    };

    const saveCustomer = async (saveData) => {
        const data = await saveCustomerService(saveData, customersRequest);
        if (data) {
            saveCustomerResponse(data);
        }
    };

    useEffect(() => {
        if (activeTab > 0) {
    
            const setCustomerData = (customerData) => {
                let setCorrectly = false;
                for (const item in tabsList) {
                    if (item !== undefined && tabsList[item].eventKey === customerData.id && tabsList[item].title == customerData.full_name) {
                        setCorrectly = true;
                    }
                }
                if (!setCorrectly) {
                    addCustomerTabName(customerData);
                }
                setCustomerDetailsData(customerData);
            };

            const getCustomer = async () => {
                const data = await getCustomerService({id: activeTab}, customersRequest);
                if (data) {
                    setCustomerData(data);
                }
            };
          
            getCustomer();
        }
    }, [activeTab]);

    const removeCustomer = async (customerId) => {
        const removeCustomerResponse = (data) => {
            removeTabData(customerId);
        };

        const data = await removeCustomerService({id: activeTab}, customersRequest);

        removeCustomerResponse(data);
    };

    return (
        <>
            <section id="roles-page" className="card">
                <div className="tabs-container">
                    <Tabs
                        tabsData={tabsList}
                        activeTabKey={activeTab}
                        onTabChange={ (activeTabKey) => { setActiveTab(activeTabKey); navigate(`/b2b-customers/`+ activeTabKey); }}
                        removeTab={ (tabEventKey) => { removeTabData(tabEventKey) }}
                    />
                    <button type="button" className="btn-control button-add" onClick={() => {setShow(true)}}>Novi B2B kupac</button>
                </div>
                <AddB2BCustomerModal
                    openModal={show}
                    handleClose={() => {setShow(false)}}
                    companyList={companyList}
                    saveCustomer={(dataForSave) => { saveCustomer(dataForSave); }}
                />
                { activeTab === initTab[0].eventKey && (
                    <B2BCustomersList addTab={ (tabData) => { addTabData(tabData) }} />
                )}
                { activeTab !== initTab[0].eventKey && (
                    <B2BCustomerDetails
                        companyList={companyList}
                        customerData={customerDetailsData}
                        saveCustomer={(dataForSave) => { saveCustomer(dataForSave); }}
                        removeCustomer={(id) => { removeCustomer(id); }}
                    />
                )}
            </section>
            {isLoading  && (
                <Loader />
            )}
        </>
    );
}

export default B2BCustomersPage;