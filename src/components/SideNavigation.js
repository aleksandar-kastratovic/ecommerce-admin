import sideNavLogoDark from "./../assets/images/croonus-sidebar-logo-dark.svg";
import sideNavLogoLight from "./../assets/images/croonus-sidebar-logo-light.svg";
import sideNavIcon from "./../assets/images/croonus-sidebar-icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faCity, faPercentage, faUserTag ,faSitemap, faArchive, faSearchLocation, faHome, faBell, faUsers, faPeopleArrows, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/auth-contex";
import { screensData } from "./../helpers/const"

const SideNavigation = ({ activeTheme, userName }) => {

    const { userScreens } = useContext(AuthContext);

    return (
        <nav id="sidebar">
             <NavLink to='/' className="logo">
                <img 
                    className={"img-fluid desktop-logo" + (activeTheme ? " dark-theme-logo" : " light-theme-logo")}
                    src={activeTheme ? sideNavLogoDark: sideNavLogoLight}
                    alt={activeTheme ? sideNavLogoDark: sideNavLogoLight}
                />
                <img
                    className={"img-fluid mobile-logo" + (activeTheme ? " dark-theme-icon" : " light-theme-icon")}
                    src={sideNavIcon}
                    alt={sideNavIcon}
                />
            </NavLink>
            <div className="sidebar-welcome">
                <h5>Dobrodošao</h5>
                <p>{userName}</p>
            </div>
            <ul className="list-unstyled components mb-5 scroll-view">
                <li>
                    <NavLink to='/' className={navData => navData.isActive ? 'active' : '' }>
                        <FontAwesomeIcon icon={faHome} />
                        Početna
                    </NavLink>
                </li>
                <li className="sidebar-categories">
                    <p>B2B Administracija</p>
                </li>
                { (userScreens !== undefined) && ( userScreens.map(function(object) {
                    if (object.id === screensData.ORDER.id) {
                        return  <li key={object.id} style={ { order: 1 }}>
                                    <NavLink to='/orders' className={navData => navData.isActive ? 'active' : '' }>
                                        <FontAwesomeIcon icon={faFileAlt} />
                                         Porudžbine
                                    </NavLink> 
                                </li>
                    }
                    if (object.id === screensData.CATEG.id) {
                        return  <li key={object.id} style={ { order: 2 }}>
                                    <NavLink to='/categories' className={navData => navData.isActive ? 'active' : '' }>
                                        <FontAwesomeIcon icon={faSitemap} />
                                        Kategorije
                                    </NavLink>
                                </li>
                    }
                    // TODO: Change screen
                    if (object.id === screensData.BANNR.id) {
                        return  <li key={object.id} style={ { order: 3 }}>
                                    <NavLink to='/product-attributes' className={navData => navData.isActive ? 'active' : '' }>
                                        <FontAwesomeIcon icon={faLayerGroup} />
                                        Atributi proizvoda
                                    </NavLink>
                                </li>
                    }
                    if (object.id === screensData.PRODU.id) {
                        return  <li key={object.id} style={ { order: 4 }}>
                                    <NavLink to='/products' className={navData => navData.isActive ? 'active' : '' }>
                                        <FontAwesomeIcon icon={faArchive} />
                                        Proizvodi
                                    </NavLink>
                                </li>
                    }
                    if (object.id === screensData.LOCAT.id) {
                        return  <li key={object.id} style={ { order: 5 }}>
                                    <NavLink to='/locations' className={navData => navData.isActive ? 'active' : '' }>
                                        <FontAwesomeIcon icon={faSearchLocation} />
                                        Lokacije
                                    </NavLink>
                                </li>
                    }
                    // if (object.id === screensData.ACTON.id) {
                    //     return  <li key={object.id} style={ { order: 6 }}>
                    //                 <NavLink to='/actions' className={navData => navData.isActive ? 'active' : '' }>
                    //                     <FontAwesomeIcon icon={faPercentage} />
                    //                     Akcije
                    //                 </NavLink>
                    //             </li>
                    // }
                    // TODO: Change screen
                    // if (object.id === screensData.NEEWS.id) {
                    //     return  <li key={object.id} style={ { order: 5 }}>
                    //                 <NavLink to='/partners' className={navData => navData.isActive ? 'active' : '' }>
                    //                     <FontAwesomeIcon icon={faBriefcase} />
                    //                     Partneri
                    //                 </NavLink>
                    //             </li>
                    // }
                    // TODO: Change screen
                    if (object.id === screensData.CUSTM.id) {
                        return  <li key={object.id} style={ { order: 7 }}>
                                    <NavLink to='/b2b-customers' className={navData => navData.isActive ? 'active' : '' }>
                                        <FontAwesomeIcon icon={faUserTag} />
                                        B2B kupci
                                    </NavLink>
                                </li>
                    }
                    if (object.id === screensData.ACTON.id) {
                        return  <li key={object.id} style={ { order: 8 }}>
                                    <NavLink to='/companies' className={navData => navData.isActive ? 'active' : '' }>
                                        <FontAwesomeIcon icon={faCity} />
                                        Kompanije
                                    </NavLink>
                                </li>
                    }
                    if (object.id === screensData.USERS.id) {
                        return  <li key={object.id} style={ { order: 9 }}>
                                    <NavLink to='/users' className={navData => navData.isActive ? 'active' : '' }>
                                        <FontAwesomeIcon icon={faUsers} />
                                        Korisnici
                                    </NavLink>
                                </li>
                    }
                    if (object.id === screensData.ROLES.id) {
                        return  <li key={object.id} style={ { order: 10 }}>
                                    <NavLink to='/roles' className={navData => navData.isActive ? 'active' : '' }>
                                        <FontAwesomeIcon icon={faPeopleArrows} />
                                        Uloge
                                    </NavLink>
                                </li>
                    }
                }))}

                <li style={ { order: 11 }} className="sidebar-categories">
                    <p>Ostalo</p>
                </li>
                <li style={ { order: 12 }}>
                    <NavLink to='/notification' className={navData => navData.isActive ? 'active' : '' }>
                        <FontAwesomeIcon icon={faBell} />
                        Obaveštenja
                    </NavLink>
                </li>
            </ul>
        </nav>
    );

};

export default SideNavigation;