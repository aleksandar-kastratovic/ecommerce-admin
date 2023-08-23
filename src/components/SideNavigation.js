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
import Typography from "@mui/material/Typography";
import useAPI from "../api/api";
import { useQuery } from "react-query";
const SideNavigation = ({ activeTheme, userName }) => {
    const { userScreens, logout } = useContext(AuthContext);
    const authCtx = useContext(AuthContext);
    const sortedScreens = userScreens?.sort((a, b) => a.order - b.order);
    const initialOpenGroups = {
        Prodaja: true,
    };
    const [openGroups, setOpenGroups] = useState(initialOpenGroups);
    const api = useAPI();

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

    const { data: badgeNumberB2c } = useQuery(
        "badgeNumberB2c",
        async () => {
            const response = await api.get(`admin/orders-b2c/list/badge-count`);
            return response?.payload;
        },
        {
            refetchInterval: 5000,
        }
    );

    const { data: badgeNumberB2b } = useQuery(
        "badgeNumberB2b",
        async () => {
            const response = await api.get(`admin/orders-b2b/list/badge-count`);
            return response?.payload;
        },
        {
            refetchInterval: 5000,
        }
    );

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
                <Typography variant="subtitle1" sx={{ margin: "1rem 0 0", fontSize: "0.875rem" }}>
                    Dobrodošli
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: "500" }}>
                    {userName}
                </Typography>
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
                                    let renderedLink;

                                    switch (item?.path) {
                                        case "/b2c-orders":
                                            const badgeB2c = badgeNumberB2c || [];
                                            renderedLink = (
                                                <Badge
                                                    badgeContent={badgeB2c.find((item) => item.status === "new")?.count || 0}
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
                                            );
                                            break;

                                        case "/b2b-orders":
                                            const badgeB2b = badgeNumberB2b || [];
                                            renderedLink = (
                                                <Badge
                                                    badgeContent={badgeB2b.find((item) => item.status === "new")?.count || 0}
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
                                            );
                                            break;

                                        default:
                                            renderedLink = (
                                                <NavLink to={item.path} className={(navData) => (navData.isActive ? "active" : "")}>
                                                    <Unicon icon={item.icon} />
                                                    {item.name}
                                                </NavLink>
                                            );
                                            break;
                                    }

                                    return <li key={item.path}>{renderedLink}</li>;
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
