import React, { useContext, useState, useEffect, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { availableScreens } from "../routes/routes";
import sideNavLogoDark from "./../assets/images/croonus-sidebar-logo-dark.svg";
import sideNavLogoLight from "./../assets/images/croonus-sidebar-logo-light.svg";
import sideNavIcon from "./../assets/images/croonus-sidebar-icon.svg";
import AuthContext from "../store/auth-contex";
import Unicon from "./shared/Unicon/Unicon";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Badge from "@mui/material/Badge";

const SideNavigation = ({ activeTheme, userName }) => {
    const { userScreens, logout } = useContext(AuthContext);
    const authCtx = useContext(AuthContext);
    const sortedScreens = userScreens?.sort((a, b) => a.order - b.order);
    const initialOpenGroups = {
        Prodaja: true,
    };
    const [openGroups, setOpenGroups] = useState(initialOpenGroups);
    // Populate the menu
    let menu = [];
    for (const allowedScreen of sortedScreens ?? []) {
        // Check for local screen definition
        const screen = availableScreens[allowedScreen.screen_code];
        if (screen) {
            screen.name = allowedScreen.screen;
            // Init
            menu[screen.group.order] = menu[screen.group.order] ?? {
                name: screen.group.name,
                items: [],
            };

            // Add item
            menu[screen.group.order].items.push(screen);
        }
    }

    const toggleGroup = (groupName) => {
        setOpenGroups((prevOpenGroups) => ({
            ...prevOpenGroups,
            [groupName]: !prevOpenGroups[groupName],
        }));
    };

    useEffect(() => {
        const storedOpenGroups = JSON.parse(localStorage.getItem("openGroups")) || {};
        console.log(openGroups);
        if (Object.keys(storedOpenGroups).length === 0) {
            setOpenGroups(initialOpenGroups);
        } else {
            setOpenGroups(storedOpenGroups);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("openGroups", JSON.stringify(openGroups));
    }, [openGroups]);

    return (
        <nav id="sidebar">
            <NavLink to="/homepage" className="logo">
                <img
                    className={"img-fluid desktop-logo" + (activeTheme ? " dark-theme-logo" : " light-theme-logo")}
                    src={activeTheme ? sideNavLogoDark : sideNavLogoLight}
                    alt={activeTheme ? sideNavLogoDark : sideNavLogoLight}
                />
                <img className={"img-fluid mobile-logo" + (activeTheme ? " dark-theme-icon" : " light-theme-icon")} src={sideNavIcon} alt={sideNavIcon} />
            </NavLink>
            <div className="sidebar-welcome">
                <h5>Dobrodošli</h5>
                <p>{userName}</p>
            </div>
            <ul className="list-unstyled components mb-5 scroll-view">
                {menu.map((menuGroup) => (
                    <Fragment key={menuGroup.name}>
                        <li className="sidebar-categories">
                            <p
                                className={`group-toggle-button`}
                                onClick={() => toggleGroup(menuGroup.name)}
                                style={{
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    transition: "height 0.3s ease",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    height: openGroups[menuGroup.name] ? "2rem" : "1.5rem",
                                }}
                            >
                                {menuGroup.name}

                                {openGroups[menuGroup.name] ? <ExpandMore sx={{ fontSize: "1rem" }} /> : <ChevronRight sx={{ fontSize: "1rem" }} />}
                            </p>
                        </li>

                        {openGroups[menuGroup.name] && (
                            <>
                                {menuGroup.items.map((item, index) => {
                                    return (
                                        <li key={item.path}>
                                            {item?.name === "Narudžbenice" && item?.group?.name === "B2C" ? (
                                                <Badge
                                                    badgeContent={0}
                                                    showZero
                                                    sx={{
                                                        ".MuiBadge-badge": { backgroundColor: "#d32f2f", fontSize: "0.625rem", top: "50%", transform: "translateY(-50%)", right: "1rem" },
                                                        width: "100%",
                                                    }}
                                                >
                                                    <NavLink to={item.path} className={(navData) => (navData.isActive ? "active" : "")} style={{ width: "100%" }}>
                                                        <Unicon icon={item?.icon} />
                                                        {item?.name}
                                                    </NavLink>
                                                </Badge>
                                            ) : (
                                                <NavLink to={item.path} className={(navData) => (navData.isActive ? "active" : "")}>
                                                    <Unicon icon={item.icon} />
                                                    {item.name}
                                                </NavLink>
                                            )}
                                            {/* {
                                                <Badge badgeContent={1} color="secondary">
                                                    <NavLink to={item.path} className={(navData) => (navData.isActive ? "active" : "")}>
                                                        <Unicon icon={item.icon} />
                                                        {item.name}
                                                    </NavLink>
                                                </Badge>
                                            } */}
                                        </li>
                                    );
                                })}
                            </>
                        )}
                    </Fragment>
                ))}
            </ul>
        </nav>
    );
};

export default SideNavigation;
