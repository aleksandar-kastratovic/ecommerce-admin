import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductAttributeDetails from "../components/ProductAttributeDetails";
import ProductAttributesList from "../components/ProductAttributesList";
import AddProductAttributeModal from "../components/UI/AddProductAttributeModal";
import Loader from "../components/UI/Loader";
import Tabs from "../components/UI/Tabs";
import { addTabName } from "../helpers/functions";
import { getProductAttributeService, removeProductAttributeService, saveProductAttributeService } from "../helpers/services";
import useHttp from "../hooks/use-http";

const ProductAttributesPage = () => {
    let initTab = [
        {
            eventKey: 0,
            title: "Lista Atributa Proizvoda",
            order: 1
        }
    ];
    let { attId } = useParams();
    if (+attId > 0) {
        initTab.push({
            eventKey: +attId,
            title: ' ',
            order: +attId + 1
        });
    };

    let navigate = useNavigate();
    const { isLoading, sendRequest: httpRequest } = useHttp();
    const [activeTab, setActiveTab] = useState((initTab[1] && initTab[1].eventKey) ? initTab[1].eventKey : initTab[0].eventKey);
    const [show, setShow] = useState(false);
    const [tabsList, setTabsList] = useState(initTab);
    const [productAttributeDetailsData, setProductAttributeDetailsData] = useState({});

    const addTabData = (tabData) => {
        for (const elem in tabsList) {
            if (tabsList[elem] !== undefined) {
                if (tabsList[elem].eventKey === tabData.eventKey) {
                    if (tabData.eventKey !== activeTab) {
                        setActiveTab(tabData.eventKey);
                        navigate(`/product-attributes/`+ tabData.eventKey);
                    }
                    return;
                }
            }
        }
        tabData.order = tabsList[tabsList.length -1].order + 1;
        setTabsList(oldArray => [...oldArray, tabData]);
        setActiveTab(tabData.eventKey);
        navigate(`/product-attributes/`+ tabData.eventKey);
    }

    const addProductAttributeTabName = (tabData) => {
        const data = addTabName(tabsList, tabData);
        if (data) {
            setTabsList(data);
        }
    }

    const removeTabData = (tabEventKey) => {
        setTabsList(tabsList.filter(item => item.eventKey !== tabEventKey));
        if (tabEventKey === activeTab) {
            setActiveTab(initTab[0].eventKey);
            navigate(`/product-attributes/`+ initTab[0].eventKey);
        }
    }

    const saveProductAttributeResponse = (productAttributeData) => {
        if (productAttributeData.id === activeTab) {
            setProductAttributeDetailsData(productAttributeData);
        }
        if ( productAttributeData.id && productAttributeData.attribute_name) {
            const tabData = {
                eventKey: productAttributeData.id,
                title: productAttributeData.attribute_name,
                order: productAttributeData.id + 1
            };
            addTabData(tabData);
        } else {
            setActiveTab(initTab[0].eventKey - 1);
            setActiveTab(initTab[0].eventKey);
        }
    };

    const saveProductAttribute = async (saveData) => {
        const data = await saveProductAttributeService(saveData, httpRequest);
        if (data) {
            saveProductAttributeResponse(data);
        }
    };

    useEffect(() => {
        if (activeTab > 0) {
    
            const setProductAttributeData = (productAttributeData) => {
                let setCorrectly = false;
                for (const item in tabsList) {
                    if (item !== undefined && tabsList[item].eventKey === productAttributeData.id && tabsList[item].title == productAttributeData.attribute_name) {
                        setCorrectly = true;
                    }
                }
                if (!setCorrectly) {
                    addProductAttributeTabName(productAttributeData);
                }
                setProductAttributeDetailsData(productAttributeData);
            };

            const getProductAttributes = async () => {
                const data = await getProductAttributeService({id: activeTab}, httpRequest);
                if (data) {
                    setProductAttributeData(data);
                }
            };
          
            getProductAttributes ();
        }
    }, [activeTab]);

    const removeProductAttribute = async (productAttributeId) => {
        const removeProductAttributeResponse = (data) => {
            removeTabData(productAttributeId);
        };

        const data = await removeProductAttributeService({id: activeTab}, httpRequest);

        removeProductAttributeResponse(data);
    };

    return (
        <>
            <section id="roles-page" className="card">
                <div className="tabs-container">
                    <Tabs
                        tabsData={tabsList}
                        activeTabKey={activeTab}
                        onTabChange={ (activeTabKey) => { setActiveTab(activeTabKey); navigate(`/product-attributes/`+ activeTabKey); }}
                        removeTab={ (tabEventKey) => { removeTabData(tabEventKey) }}
                    />
                    <button type="button" className="btn-control button-add" onClick={() => {setShow(true)}}>Novi atribut proizvoda</button>
                </div>
                <AddProductAttributeModal
                    openModal={show}
                    handleClose={() => {setShow(false)}}
                    saveProductAttribute={(dataForSave) => { saveProductAttribute(dataForSave); }}
                />
                { activeTab === initTab[0].eventKey && (
                    <ProductAttributesList addTab={ (tabData) => { addTabData(tabData) }} />
                )}
                { activeTab !== initTab[0].eventKey && (
                    <ProductAttributeDetails
                        productAttributeData={productAttributeDetailsData}
                        saveProductAttribute={(dataForSave) => { saveProductAttribute(dataForSave); }}
                        removeProductAttribute={(id) => { removeProductAttribute(id); }}
                    />
                )}
            </section>
            {(isLoading) && (
                <Loader />
            )}
        </>
    );
}

export default ProductAttributesPage;