import { availableScreens } from "../routes/routes"
import sideNavLogoDark from "./../assets/images/croonus-sidebar-logo-dark.svg"
import sideNavLogoLight from "./../assets/images/croonus-sidebar-logo-light.svg"
import sideNavIcon from "./../assets/images/croonus-sidebar-icon.svg"
import { NavLink } from "react-router-dom"
import React, { useContext } from "react"
import AuthContext from "../store/auth-contex"
import Unicon from "./shared/Unicon/Unicon"

const SideNavigation = ({ activeTheme, userName }) => {
    const { userScreens } = useContext(AuthContext)

    // Populate the menu
    let menu = []
    for (const allowedScreen of (userScreens ?? [])) {

        // Check for local screen definition
        const screen = availableScreens[allowedScreen.screen_code]
        if (screen) {

            // Init
            menu[screen.group.order] = menu[screen.group.order] ?? {
                name : screen.group.name,
                items: []
            }

            // Add item
            menu[screen.group.order].items.push(screen)
        }
    }

    return (
        <nav id="sidebar">
            <NavLink to="/" className="logo">
                <img
                    className={"img-fluid desktop-logo" + (activeTheme ? " dark-theme-logo" : " light-theme-logo")}
                    src={activeTheme ? sideNavLogoDark : sideNavLogoLight}
                    alt={activeTheme ? sideNavLogoDark : sideNavLogoLight}
                />
                <img
                    className={"img-fluid mobile-logo" + (activeTheme ? " dark-theme-icon" : " light-theme-icon")}
                    src={sideNavIcon}
                    alt={sideNavIcon}
                />
            </NavLink>
            <div className="sidebar-welcome">
                <h5>Dobrodošli</h5>
                <p>{userName}</p>
            </div>
            <ul className="list-unstyled components mb-5 scroll-view">
                {/*
                 <li>
                 <NavLink to='/' className={navData => navData.isActive ? 'active' : '' }>
                 <FontAwesomeIcon icon={faHome} />
                 Početna
                 </NavLink>
                 </li>
                 */}

                {menu.map(menuGroup => (
                    <React.Fragment key={menuGroup.name}>

                        <li className="sidebar-categories">
                            <p>{menuGroup.name}</p>
                        </li>

                        {menuGroup.items.map(item => (
                            <li key={item.path}>
                                <NavLink to={item.path} className={navData => navData.isActive ? "active" : ""}>
                                    <Unicon icon={item.icon} />
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </React.Fragment>
                ))}

                {/*
                 <li className="sidebar-categories">
                 <p>Ostalo</p>
                 </li>
                 <li>
                 <NavLink to='/notification' className={navData => navData.isActive ? 'active' : '' }>
                 <FontAwesomeIcon icon={faBell} />
                 Obaveštenja
                 </NavLink>
                 </li>
                 */}
            </ul>
        </nav>
    )

}

export default SideNavigation
