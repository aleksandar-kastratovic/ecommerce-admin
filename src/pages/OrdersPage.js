import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderDetails from "../components/OrderDetails";
import OrdersList from "../components/OrdersList";
import Loader from "../components/UI/Loader";
import Tabs from "../components/UI/Tabs";
import { addTabName } from "../helpers/functions";
import { getOrderService, saveOrderStatusService } from "../helpers/services";
import useHttp from "../hooks/use-http";

const OrdersPage = () => {

    let initTab = [
        {
            eventKey: 0,
            title: "Lista Porudžbina",
            order: 1
        }
    ];
    let { ordId } = useParams();
    if (+ordId > 0) {
        initTab.push({
            eventKey: +ordId,
            title: ' ',
            order: +ordId + 1
        });
    };

    let navigate = useNavigate();
    const { isLoading, sendRequest: orderRequest } = useHttp();
    const [activeTab, setActiveTab] = useState((initTab[1] && initTab[1].eventKey) ? initTab[1].eventKey : initTab[0].eventKey);
    const [tabsList, setTabsList] = useState(initTab);
    const [orderDetailsData, setOrderDetailsData] = useState({});

    const addTabData = (tabData) => {
        for (const elem in tabsList) {
            if (tabsList[elem] !== undefined) {
                if (tabsList[elem].eventKey === tabData.eventKey) {
                    if (tabData.eventKey !== activeTab) {
                        setActiveTab(tabData.eventKey);
                        navigate(`/orders/`+ tabData.eventKey);
                    }
                    return;
                }
            }
        }
        tabData.order = tabsList[tabsList.length -1].order + 1;
        setTabsList(oldArray => [...oldArray, tabData]);
        setActiveTab(tabData.eventKey);
        navigate(`/orders/`+ tabData.eventKey);
    }

    const addOrderTabName = (tabData) => {
        const data = addTabName(tabsList, tabData);
        if (data) {
            setTabsList(data);
        }
    }

    const removeTabData = (tabEventKey) => {
        setTabsList(tabsList.filter(item => item.eventKey !== tabEventKey));
        if (tabEventKey === activeTab) {
            setActiveTab(initTab[0].eventKey);
            navigate(`/orders/`+ initTab[0].eventKey);
        }
    }

    useEffect(() => {
        if (activeTab > 0) {
    
            const setOrderData = (orderData) => {
                let setCorrectly = false;
                for (const item in tabsList) {
                    if (item !== undefined && tabsList[item].eventKey === orderData.id && tabsList[item].title == orderData.order_name) {
                        setCorrectly = true;
                    }
                }
                if (!setCorrectly) {
                    addOrderTabName(orderData);
                }
                setOrderDetailsData(orderData);
            };

            const getOrder = async () => {
                const data = await getOrderService({id: activeTab}, orderRequest);
                if (data) {
                    setOrderData(data);
                }
            };
          
            getOrder();
        }
    }, [activeTab]);

    const saveOrderStatusResponse = (orderData) => {
        if (orderData.id === activeTab) {
            setOrderDetailsData(orderData);
        }
        if ( orderData.id && orderData.order_name) {
            const tabData = {
                eventKey: orderData.id,
                title: orderData.order_name,
                order: orderData.id + 1
            };
            addTabData(tabData);
        } else {
            setActiveTab(initTab[0].eventKey - 1);
            setActiveTab(initTab[0].eventKey);
        }
    };

    const saveOrderStatus = async (saveData) => {
        const data = await saveOrderStatusService(saveData, orderRequest);
        if (data) {
            saveOrderStatusResponse(data);
        }
    };

    return (
        <>
            <section id="roles-page" className="card">
                <div className="tabs-container">
                    <Tabs
                        tabsData={tabsList}
                        activeTabKey={activeTab}
                        onTabChange={ (activeTabKey) => { setActiveTab(activeTabKey); navigate(`/orders/`+ activeTabKey); }}
                        removeTab={ (tabEventKey) => { removeTabData(tabEventKey) }}
                    />
                </div>
                { activeTab === initTab[0].eventKey && (
                    <OrdersList addTab={ (tabData) => { addTabData(tabData) }} />
                )}
                { activeTab !== initTab[0].eventKey && (
                    <OrderDetails
                        orderData={orderDetailsData}
                        saveOrderStatus={(dataForSave) => saveOrderStatus(dataForSave)}
                    />
                )}
            </section>
            {isLoading  && (
                <Loader />
            )}
        </>
    );
}

export default OrdersPage;
