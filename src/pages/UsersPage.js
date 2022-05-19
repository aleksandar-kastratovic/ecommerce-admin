import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddUserModal from "../components/UI/AddUserModal";
import Loader from "../components/UI/Loader";
import Tabs from "../components/UI/Tabs";
import UserDetails from "../components/UserDetails";
import UsersList from "../components/UsersList";
import { addTabName } from "../helpers/functions";
import { getUserService, removeUserService, saveUserService } from "../helpers/services";
import useHttp from "../hooks/use-http";

const UsersPage = () => {
    let initTab = [
        {
            eventKey: 0,
            title: "Lista Korisnika",
            order: 1
        }
    ];

    let { userId } = useParams();
    if (+userId > 0) {
        initTab.push({
            eventKey: +userId,
            title: ' ',
            order: +userId + 1
        });
    };

    let navigate = useNavigate();
    const { isLoading, sendRequest: saveUserRequest } = useHttp();
    const { isLoading: isLoading2, sendRequest: getUserRequest } = useHttp();
    const [activeTab, setActiveTab] = useState((initTab[1] && initTab[1].eventKey) ? initTab[1].eventKey : initTab[0].eventKey);
    const [show, setShow] = useState(false);
    const [tabsList, setTabsList] = useState(initTab);
    const [userDetailsData, setUserDetailsData] = useState({});

    const addTabData = (tabData) => {
        for (const elem in tabsList) {
            if (tabsList[elem] !== undefined) {
                if (tabsList[elem].eventKey === tabData.eventKey) {
                    if (tabData.eventKey !== activeTab) {
                        setActiveTab(tabData.eventKey);
                        navigate(`/users/`+ tabData.eventKey);
                    }
                    return;
                }
            }
        }
        tabData.order = tabsList[tabsList.length -1].order + 1;
        setTabsList(oldArray => [...oldArray, tabData]);
        setActiveTab(tabData.eventKey);
        navigate(`/users/`+ tabData.eventKey);
    }
    const addUserTabName = (tabData) => {
        const data = addTabName(tabsList, tabData);
        if (data) {
            setTabsList(data);
        }
    }

    const removeTabData = (tabEventKey) => {
        setTabsList(tabsList.filter(item => item.eventKey !== tabEventKey));
        if (tabEventKey === activeTab) {
            setActiveTab(initTab[0].eventKey);
            navigate(`/users/`+ initTab[0].eventKey);
        }
    }

    const saveUserResponse = (userData) => {
        if (userData.id === activeTab) {
            setUserDetailsData(userData);
        }
        if ( userData.id && userData.full_name) {
            const tabData = {
                eventKey: userData.id,
                title: userData.full_name,
                order: userData.id + 1
            };
            addTabData(tabData);
        } else {
            setActiveTab(initTab[0].eventKey - 1);
            setActiveTab(initTab[0].eventKey);
        }
    };

    useEffect(() => {
        if (activeTab > 0) {
    
            const setUserData = (userData) => {
                let setCorrectly = false;
                for (const item in tabsList) {
                    if (item !== undefined && tabsList[item].eventKey === userData.id && tabsList[item].title == userData.full_name) {
                        setCorrectly = true;
                    }
                }
                if (!setCorrectly) {
                    addUserTabName(userData);
                }
                setUserDetailsData(userData);
            };
      
            const getUser = async () => {
                const data = await getUserService({id: activeTab}, getUserRequest);
                if (data) {
                    setUserData(data);
                }
            };
          
            getUser();
        }
    }, [activeTab]);

    const saveUser = async (saveData) => {
        const data = await saveUserService(saveData, saveUserRequest);
        saveUserResponse(data);
    };

    const removeUser = async (userId) => {
        const removeUserResponse = (data) => {
            removeTabData(userId);
        };

        const data = await removeUserService({id: activeTab}, saveUserRequest);

        removeUserResponse(data);
    };

    return (
        <>
            <section id="roles-page" className="card">
                <div className="tabs-container">
                    <Tabs
                        tabsData={tabsList}
                        activeTabKey={activeTab}
                        onTabChange={ (activeTabKey) => { setActiveTab(activeTabKey) }}
                        removeTab={ (tabEventKey) => { removeTabData(tabEventKey) }}
                    />
                    <button type="button" className="btn-control button-add" onClick={() => {setShow(true)}}>Novi korisnik</button>
                </div>
                <AddUserModal
                    saveUser={(dataForSave) => { saveUser(dataForSave); }}
                    openModal={show}
                    handleClose={() => {setShow(false)}} />
                { activeTab === initTab[0].eventKey && (
                    <UsersList addTab={ (tabData) => { addTabData(tabData) }}/>
                )}
                { activeTab !== initTab[0].eventKey && (
                    <UserDetails
                        userData={userDetailsData}
                        saveUser={(dataForSave) => { saveUser(dataForSave); }}
                        removeUser={(id) => { removeUser(id); }}
                    />
                )}
            </section>
            {(isLoading || isLoading2) && (
                <Loader />
            )}
        </>
    );
}

export default UsersPage;