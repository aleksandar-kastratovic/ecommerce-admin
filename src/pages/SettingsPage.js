import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LocationDetails from "../components/LocationDetails";
import LocationsList from "../components/LocationsList";
import SettingsDetails from "../components/SettingsDetails";
import AddLocationModal from "../components/UI/AddLocationModal";
import Loader from "../components/UI/Loader";
import Tabs from "../components/UI/Tabs";
import { addTabName } from "../helpers/functions";
import { getLocationService, removeLocationsService, saveLocationService } from "../helpers/services";
import useHttp from "../hooks/use-http";

const SettingsPage = () => {

    let initTab = [
        {
            eventKey: 0,
            title: "Podešavanja",
            order: 1
        }
    ];

    const [activeTab, setActiveTab] = useState(initTab[0].eventKey);
    const { isLoading, sendRequest: locationsRequest } = useHttp();
    const [tabsList, setTabsList] = useState(initTab);
    const [locationsDetailsData, setLocationsDetailsData] = useState({});

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
    }, []);

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
                </div>
                <SettingsDetails
                    locationData={locationsDetailsData}
                    saveLocation={(dataForSave) => { saveLocation(dataForSave); }}
                    removeLocation={(id) => { removeLocation(id); }}
                />
            </section>
            {isLoading  && (
                <Loader />
            )}
        </>
    );
}

export default SettingsPage;