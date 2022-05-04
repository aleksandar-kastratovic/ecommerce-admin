import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoleDetails from "../components/RoleDetails";
import RolesList from "../components/RolesList";
import AddRoleModal from "../components/UI/AddRoleModal";
import Loader from "../components/UI/Loader";
import Tabs from "../components/UI/Tabs";
import { addTabName } from "../helpers/functions";
import { getRoleService, removeRoleService, saveRoleService } from "../helpers/services";
import useHttp from "../hooks/use-http";

const RolesPage = () => {

    let initTab = [
        {
            eventKey: 0,
            title: "Lista Uloga",
            order: 1
        }
    ];
    let { roleId } = useParams();
    if (+roleId > 0) {
        initTab.push({
            eventKey: +roleId,
            title: ' ',
            order: +roleId + 1
        });
    };

    let navigate = useNavigate();
    const { isLoading: isLoading2, sendRequest: getRoleRequest } = useHttp();
    const { isLoading, sendRequest: saveRoleRequest } = useHttp();
    const [activeTab, setActiveTab] = useState((initTab[1] && initTab[1].eventKey) ? initTab[1].eventKey : initTab[0].eventKey);
    const [show, setShow] = useState(false);
    const [tabsList, setTabsList] = useState(initTab);
    const [roleDetailsData, setRoleDetailsData] = useState({});

    const addTabData = (tabData) => {
        for (const elem in tabsList) {
            if (tabsList[elem] !== undefined) {
                if (tabsList[elem].eventKey === tabData.eventKey) {
                    if (tabData.eventKey !== activeTab) {
                        setActiveTab(tabData.eventKey);
                        navigate(`/roles/`+ tabData.eventKey);
                    }
                    return;
                }
            }
        }
        tabData.order = tabsList[tabsList.length -1].order + 1;
        setTabsList(oldArray => [...oldArray, tabData]);
        setActiveTab(tabData.eventKey);
        navigate(`/roles/`+ tabData.eventKey);
    }

    const addRoleTabName = (tabData) => {
        const data = addTabName(tabsList, tabData);
        if (data) {
            setTabsList(data);
        }
    }

    const removeTabData = (tabEventKey) => {
        setTabsList(tabsList.filter(item => item.eventKey !== tabEventKey));
        if (tabEventKey === activeTab) {
            setActiveTab(initTab[0].eventKey);
            navigate(`/roles/`+ initTab[0].eventKey);
        }
    }

    const saveRoleResponse = (roleData) => {
        if (roleData.id === activeTab) {
            setRoleDetailsData(roleData);
        }
        if ( roleData.id && roleData.name) {
            const tabData = {
                eventKey: roleData.id,
                title: roleData.name,
                order: roleData.id + 1
            };
            addTabData(tabData);
        } else {
            setActiveTab(initTab[0].eventKey - 1);
            setActiveTab(initTab[0].eventKey);
        }
    };

    const saveRole = async (saveData) => {
        const data = await saveRoleService(saveData, saveRoleRequest);
        if (data) {
            saveRoleResponse(data);
        }
    };

    useEffect(() => {
        if (activeTab > 0) {
    
            const setRoleData = (roleData) => {
                let setCorrectly = false;
                for (const item in tabsList) {
                    if (item !== undefined && tabsList[item].eventKey === roleData.id && tabsList[item].title == roleData.name) {
                        setCorrectly = true;
                    }
                }
                if (!setCorrectly) {
                    addRoleTabName(roleData);
                }
                setRoleDetailsData(roleData);
            };

            const getRoles = async () => {
                const data = await getRoleService({id: activeTab}, getRoleRequest);
                setRoleData(data);
            };
          
            getRoles();
        }
    }, [activeTab]);

    const removeRole = async (roleId) => {
        const removeRoleResponse = (data) => {
            removeTabData(roleId);
        };

        const data = await removeRoleService({id: activeTab}, getRoleRequest);

        removeRoleResponse(data);
    };

    return (
        <>
            <section id="roles-page" className="card">
                <div className="tabs-container">
                    <Tabs
                        tabsData={tabsList}
                        activeTabKey={activeTab}
                        onTabChange={ (activeTabKey) => { setActiveTab(activeTabKey); navigate(`/roles/`+ activeTabKey); }}
                        removeTab={ (tabEventKey) => { removeTabData(tabEventKey) }}
                    />
                    <button type="button" className="btn-control button-add" onClick={() => {setShow(true)}}>Nova uloga</button>
                </div>
                <AddRoleModal
                    openModal={show}
                    handleClose={() => {setShow(false)}}
                    saveRole={(dataForSave) => { saveRole(dataForSave); }}
                />
                { activeTab === initTab[0].eventKey && (
                    <RolesList addTab={ (tabData) => { addTabData(tabData) }} />
                )}
                { activeTab !== initTab[0].eventKey && (
                    <RoleDetails
                        roleData={roleDetailsData}
                        saveRole={(dataForSave) => { saveRole(dataForSave); }}
                        removeRole={(id) => { removeRole(id); }}
                    />
                )}
            </section>
            {(isLoading || isLoading2) && (
                <Loader />
            )}
        </>
    );
}

export default RolesPage;