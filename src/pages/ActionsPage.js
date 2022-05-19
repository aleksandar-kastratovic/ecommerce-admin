import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LocationDetails from "../components/LocationDetails";
import LocationsList from "../components/LocationsList";
import AddActionModal from "../components/UI/AddActionModal";
import AddLocationModal from "../components/UI/AddLocationModal";
import Loader from "../components/UI/Loader";
import Tabs from "../components/UI/Tabs";
import { addTabName } from "../helpers/functions";
import { getLocationService, removeLocationsService, saveLocationService } from "../helpers/services";
import useHttp from "../hooks/use-http";

const ActionsPage = () => {

    let initTab = [
        {
            eventKey: 0,
            title: "Lista Akcija",
            order: 1
        }
    ];
    let { locId } = useParams();
    if (+locId > 0) {
        initTab.push({
            eventKey: +locId,
            title: ' ',
            order: +locId + 1
        });
    };

    let navigate = useNavigate();
    const { isLoading, sendRequest: locationsRequest } = useHttp();
    const [activeTab, setActiveTab] = useState((initTab[1] && initTab[1].eventKey) ? initTab[1].eventKey : initTab[0].eventKey);
    const [show, setShow] = useState(false);
    const [tabsList, setTabsList] = useState(initTab);
    const [locationsDetailsData, setLocationsDetailsData] = useState({});

    const addTabData = (tabData) => {
        for (const elem in tabsList) {
            if (tabsList[elem] !== undefined) {
                if (tabsList[elem].eventKey === tabData.eventKey) {
                    if (tabData.eventKey !== activeTab) {
                        setActiveTab(tabData.eventKey);
                        navigate(`/locations/`+ tabData.eventKey);
                    }
                    return;
                }
            }
        }
        tabData.order = tabsList[tabsList.length -1].order + 1;
        setTabsList(oldArray => [...oldArray, tabData]);
        setActiveTab(tabData.eventKey);
        navigate(`/locations/`+ tabData.eventKey);
    }

    const addLocationTabName = (tabData) => {
        const data = addTabName(tabsList, tabData);
        if (data) {
            setTabsList(data);
        }
    }

    const removeTabData = (tabEventKey) => {
        setTabsList(tabsList.filter(item => item.eventKey !== tabEventKey));
        if (tabEventKey === activeTab) {
            setActiveTab(initTab[0].eventKey);
            navigate(`/locations/`+ initTab[0].eventKey);
        }
    }

    const saveLocationResponse = (locationData) => {
        if (locationData.id === activeTab) {
            setLocationsDetailsData(locationData);
        }
        if ( locationData.id && locationData.name) {
            const tabData = {
                eventKey: locationData.id,
                title: locationData.name,
                order: locationData.id + 1
            };
            addTabData(tabData);
        } else {
            setActiveTab(initTab[0].eventKey - 1);
            setActiveTab(initTab[0].eventKey);
        }
    };

    const saveLocation = async (saveData) => {
        const data = await saveLocationService(saveData, locationsRequest);
        if (data) {
            saveLocationResponse(data);
        }
    };

    useEffect(() => {
        if (activeTab > 0) {
    
            const setLocationData = (locationData) => {
                let setCorrectly = false;
                for (const item in tabsList) {
                    if (item !== undefined && tabsList[item].eventKey === locationData.id && tabsList[item].title == locationData.name) {
                        setCorrectly = true;
                    }
                }
                if (!setCorrectly) {
                    addLocationTabName(locationData);
                }
                setLocationsDetailsData(locationData);
            };

            const getLocations = async () => {
                const data = await getLocationService({id: activeTab}, locationsRequest);
                if (data) {
                    setLocationData(data);
                }
            };
          
            getLocations();
        }
    }, [activeTab]);

    const removeLocation = async (locationId) => {
        const removeLocationResponse = (data) => {
            removeTabData(locationId);
        };

        const data = await removeLocationsService({id: activeTab}, locationsRequest);

        removeLocationResponse(data);
    };

    return (
        <>
            <section id="roles-page" className="card">
                <div className="tabs-container">
                    <Tabs
                        tabsData={tabsList}
                        activeTabKey={activeTab}
                        onTabChange={ (activeTabKey) => { setActiveTab(activeTabKey); navigate(`/locations/`+ activeTabKey); }}
                        removeTab={ (tabEventKey) => { removeTabData(tabEventKey) }}
                    />
                    <button type="button" className="btn-control button-add" onClick={() => {setShow(true)}}>Nova akcija</button>
                </div>
                <AddActionModal
                    openModal={show}
                    handleClose={() => {setShow(false)}}
                    saveLocation={(dataForSave) => { saveLocation(dataForSave); }}
                />
                { activeTab === initTab[0].eventKey && (
                    <LocationsList addTab={ (tabData) => { addTabData(tabData) }} />
                )}
                { activeTab !== initTab[0].eventKey && (
                    <LocationDetails
                        locationData={locationsDetailsData}
                        saveLocation={(dataForSave) => { saveLocation(dataForSave); }}
                        removeLocation={(id) => { removeLocation(id); }}
                    />
                )}
            </section>
            {isLoading  && (
                <Loader />
            )}
        </>
    );
}

export default ActionsPage;