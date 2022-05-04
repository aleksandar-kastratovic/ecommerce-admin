import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from './../assets/images/avatar.jpg'
import { faBars, faSearch, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { faWindowMaximize, faEnvelope, faBell } from '@fortawesome/free-regular-svg-icons'
import { Dropdown } from 'react-bootstrap';
import { useContext } from 'react';
import AuthContext from '../store/auth-contex';
import { useNavigate } from "react-router-dom";
import useHttp from '../hooks/use-http';
import Loader from './UI/Loader';
import { logoutService } from '../helpers/services';

const Header = ({ openSidenav, changeTheme, activeTheme }) => {

    const { logout } = useContext(AuthContext);
    let navigate = useNavigate();
    const { isLoading, sendRequest: logoutRequest } = useHttp();

    const logoutResponse = (response) => {
        logout();
        navigate(`/`);
    };

    const logoutHandler = async (event) => {
        event.preventDefault();


        const data = await logoutService(logoutRequest);
        logoutResponse(data);
    };
    

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="row w-100">
                        <div className="col-xl-1 no-padd-right align-self-center">
                            <div id="sidebarCollapse">
                                <FontAwesomeIcon icon={faBars} onClick={openSidenav}/>
                            </div>
                        </div>
                        <div className="col-xl-4 no-padd-left align-self-center navbar-search">
                            <div className="rounded rounded-pill">
                                <div className="input-group">
                                    <input type="search" placeholder="Pretražite administraciju..." className="form-control rounded-pill border-0" />
                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-link text-primary">
                                            <FontAwesomeIcon icon={faSearch} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-7 d-flex justify-content-end align-self-center">
                            <ul className="nav navbar-nav d-flex justify-content-end">
                                <li className="nav-item d-flex align-self-center">
                                    <span onClick={changeTheme} href="#" className={'btn btn-xs btn-toggle nav-link js-theme-switcher' + (activeTheme ? ' active' : '')} data-toggle="button" aria-pressed="false" autoComplete="off">
                                        <div className="handle"></div>
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><FontAwesomeIcon icon={faEnvelope} /><span className="badge-circle-red"></span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><FontAwesomeIcon icon={faBell} /><span className="badge-circle-green"></span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><FontAwesomeIcon icon={faExternalLinkAlt} /></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><FontAwesomeIcon icon={faWindowMaximize} /></a>
                                </li>
                                {/* <li className="nav-item user-icon">
                                    <a className="nav-link" href="#"><img className="img-fluid rounded-pill" src={Avatar} /></a>
                                </li> */}
                                <Dropdown className="nav-item user-icon dropdown-common-style">
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="nav-link">
                                        <img alt='' className="img-fluid rounded-pill" src={Avatar} />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Profil</Dropdown.Item>
                                        <Dropdown.Item href="#" onClick={(e) => { logoutHandler(e) }}>Odjavite se</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && (
                <Loader />
            )}
        </nav>
    );
};

export default Header;
