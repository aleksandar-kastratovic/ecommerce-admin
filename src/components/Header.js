import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import AuthContext from "../store/auth-contex";
import useHttp from "../hooks/use-http";
import Loader from "./shared/Loading/Loading";
import { logoutService } from "../helpers/services";

import DehazeIcon from "@mui/icons-material/Dehaze";
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LaunchIcon from "@mui/icons-material/Launch";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";

import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { styled } from "@mui/system";

const Header = ({ openSidenav, changeTheme, activeTheme }) => {
    const { logout, user } = useContext(AuthContext);
    let navigate = useNavigate();
    const { isLoading, sendRequest: logoutRequest } = useHttp();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const logoutResponse = (response) => {
        logout();
        navigate(`/`);
    };

    const logoutHandler = async (event) => {
        event.preventDefault();

        const data = await logoutService(logoutRequest);
        logoutResponse(data);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const StyledNav = styled(Box)({
        backgroundColor: "var(--bg-color)",
        padding: "0.938rem 2rem",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    });

    const StyledToggleButton = styled(Switch)({
        "& .MuiSwitch-thumb": {
            boxShadow: "0px 0px 10px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,2,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        },
        ".MuiSwitch-switchBase.Mui-checked": {
            color: "var(--main-color)",
            "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
        },
    });

    return (
        <>
            <StyledNav>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={1} sx={{ pr: 1 }}>
                        <IconButton onClick={openSidenav}>
                            <DehazeIcon sx={{ color: "var(--third-color)" }} />
                        </IconButton>
                    </Grid>
                    {/* <Grid item xs={4} sx={{ pl: 1 }}>
                    <Box sx={{ borderRadius: "30px", backgroundColor: "#fff", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
                        <Grid container alignItems="center">
                            <Grid item sx={{ pr: 1 }}>
                                <SearchIcon />
                            </Grid>
                            <Grid item xs>
                                <input type="search" placeholder="Pretražite administraciju..." className="form-control rounded-pill border-0" />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid> */}

                    <Grid container alignItems="center" width="auto">
                        <Grid item>
                            <StyledToggleButton checked={activeTheme} onClick={changeTheme} name="themeSwitcher" inputProps={{ "aria-label": "toggle theme" }} />
                        </Grid>
                        <Grid item sx={{ display: { xs: "none", md: "block" } }}>
                            {/* <StyledNavLink href="#">
                                <EmailIcon />
                                <StyledBadge color="secondary" variant="dot" />
                            </StyledNavLink> */}
                        </Grid>
                        <Grid item sx={{ display: { xs: "none", md: "block" } }}>
                            {/* <StyledNavLink href="#">
                                <NotificationsIcon />
                                <StyledBadge color="success" variant="dot" />
                            </StyledNavLink> */}
                        </Grid>
                        <Grid item sx={{ display: { xs: "none", md: "block" } }}>
                            {/* <StyledNavLink href="#">
                                <LaunchIcon />
                            </StyledNavLink> */}
                        </Grid>
                        <Grid item sx={{ display: { xs: "none", md: "block" } }}>
                            {/* <StyledNavLink href="#">
                                <VideoLabelIcon />
                            </StyledNavLink> */}
                        </Grid>
                        <Grid item>
                            <Dropdown className="nav-item user-icon dropdown-common-style">
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="nav-link">
                                    <Typography variant="h5" sx={{ m: 0 }}>
                                        {user?.user?.first_name?.charAt(0) + user?.user?.last_name?.charAt(0)}
                                    </Typography>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        href="#"
                                        onClick={(e) => {
                                            logoutHandler(e);
                                        }}
                                    >
                                        Odjavite se
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Grid>
                    </Grid>
                </Grid>
            </StyledNav>
            {isLoading && <Loader size={100} />}
        </>
        // <nav className="navbar navbar-expand-lg navbar-light bg-light">
        //     <div className="container-fluid">
        //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //             <div className="row w-100 navbar-sections-container">
        //                 <div className="col-xl-1 no-padd-right align-self-center">
        //                     <div id="sidebarCollapse">
        //                         <DehazeIcon onClick={openSidenav} />
        //                     </div>
        //                 </div>
        //                 <div className="col-xl-4 no-padd-left align-self-center navbar-search hidden-for-next-version">
        //                     <div className="rounded rounded-pill">
        //                         <div className="input-group">
        //                             <input type="search" placeholder="Pretražite administraciju..." className="form-control rounded-pill border-0" />
        //                             <div className="input-group-append">
        //                                 <button type="submit" className="btn btn-link text-primary">
        //                                     <SearchIcon />
        //                                 </button>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="col-xl-7 d-flex justify-content-end align-self-center">
        //                     <ul className="nav navbar-nav d-flex justify-content-end">
        //                         <li className="nav-item d-flex align-self-center">
        //                             <Switch
        //                                 checked={activeTheme}
        //                                 onClick={changeTheme}
        //                                 name="themeSwitcher"
        //                                 color="primary"
        //                                 inputProps={{ "aria-label": "toggle theme" }}
        //                                 sx={{
        //                                     ".MuiSwitch-switchBase.Mui-checked": {
        //                                         color: "#fff",
        //                                         "&:hover": {
        //                                             backgroundColor: "rgba(255, 255, 255, 0.1)",
        //                                         },
        //                                     },
        //                                 }}
        //                             />
        //                         </li>
        //                         <li className="nav-item hidden-for-next-version">
        //                             <a className="nav-link" href="#">
        //                                 <EmailIcon />
        //                                 <span className="badge-circle-red"></span>
        //                             </a>
        //                         </li>
        //                         <li className="nav-item hidden-for-next-version">
        //                             <a className="nav-link" href="#">
        //                                 <NotificationsIcon />
        //                                 <span className="badge-circle-green"></span>
        //                             </a>
        //                         </li>
        //                         <li className="nav-item hidden-for-next-version">
        //                             <a className="nav-link" href="#">
        //                                 <LaunchIcon />
        //                             </a>
        //                         </li>
        //                         <li className="nav-item hidden-for-next-version">
        //                             <a className="nav-link" href="#">
        //                                 <VideoLabelIcon />
        //                             </a>
        //                         </li>
        //                         {/* <li className="nav-item user-icon">
        //                             <a className="nav-link" href="#"><img className="img-fluid rounded-pill" src={Avatar} /></a>
        //                         </li> */}
        //                         {/* <img alt='' className="img-fluid rounded-pill" src={Avatar} /> */}

        //                         <Dropdown className="nav-item user-icon dropdown-common-style">
        //                             <Dropdown.Toggle variant="success" id="dropdown-basic" className="nav-link">
        //                                 <h5>{user?.user?.first_name?.charAt(0) + user?.user?.last_name?.charAt(0)}</h5>
        //                             </Dropdown.Toggle>

        //                             <Dropdown.Menu>
        //                                 <Dropdown.Item
        //                                     href="#"
        //                                     onClick={(e) => {
        //                                         logoutHandler(e);
        //                                     }}
        //                                 >
        //                                     Odjavite se
        //                                 </Dropdown.Item>
        //                             </Dropdown.Menu>
        //                         </Dropdown>

        //                         {/* <li>
        //                             <IconButton
        //                                 onClick={handleClick}
        //                                 size="small"
        //                                 sx={{ ml: 2 }}
        //                                 // aria-controls={open ? "account-menu" : undefined}
        //                                 // aria-haspopup="true"
        //                                 aria-expanded={open ? "true" : undefined}
        //                             >
        //                                 {user?.user?.first_name?.charAt(0) + user?.user?.last_name?.charAt(0)}
        //                             </IconButton>
        //                             <Menu
        //                                 anchorEl={anchorEl}
        //                                 id="account-menu"
        //                                 open={open}
        //                                 onClose={handleClose}
        //                                 onClick={handleClose}
        //                                 PaperProps={{
        //                                     elevation: 0,
        //                                     sx: {
        //                                         overflow: "visible",
        //                                         filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
        //                                         mt: 1.5,
        //                                         "&:before": {
        //                                             content: '""',
        //                                             display: "block",
        //                                             position: "absolute",
        //                                             top: 0,
        //                                             right: 14,
        //                                             width: 10,
        //                                             height: 10,
        //                                             bgcolor: "background.paper",
        //                                             transform: "translateY(-50%) rotate(45deg)",
        //                                             zIndex: 0,
        //                                         },
        //                                     },
        //                                 }}
        //                                 transformOrigin={{ horizontal: "right", vertical: "top" }}
        //                                 anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        //                             >
        //                                 <MenuItem
        //                                     onClick={(e) => {
        //                                         logoutHandler(e);
        //                                     }}
        //                                 >
        //                                     Logout
        //                                 </MenuItem>
        //                             </Menu>
        //                         </li> */}
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     {isLoading && <Loader />}
        // </nav>
    );
};

export default Header;
