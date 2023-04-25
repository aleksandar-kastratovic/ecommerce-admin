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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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

                    <Grid container alignItems="center" width="auto">
                        <Grid item>
                            <StyledToggleButton checked={activeTheme} onClick={changeTheme} name="themeSwitcher" inputProps={{ "aria-label": "toggle theme" }} />
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

                            {/* <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? "account-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                >
                                    {user?.user?.first_name?.charAt(0) + user?.user?.last_name?.charAt(0)}
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: "visible",
                                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                            mt: 1.5,
                                            "&:before": {
                                                content: '""',
                                                display: "block",
                                                position: "absolute",
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: "background.paper",
                                                transform: "translateY(-50%) rotate(45deg)",
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                                >
                                    <MenuItem
                                        onClick={(e) => {
                                            logoutHandler(e);
                                        }}
                                    >
                                        Logout
                                    </MenuItem>
                                </Menu> */}
                        </Grid>
                    </Grid>
                </Grid>
            </StyledNav>
            {isLoading && <Loader size={50} />}
        </>
    );
};

export default Header;
