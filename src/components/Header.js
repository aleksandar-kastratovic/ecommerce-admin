import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-contex";
import Loader from "./shared/Loading/Loading";

import DehazeIcon from "@mui/icons-material/Dehaze";

// import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import { styled } from "@mui/system";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import sideNavIcon from "../assets/images/croonus-sidebar-icon.svg";

const Header = ({ openSidenav, changeTheme, activeTheme }) => {
    const apiPath = "admin/profile/logout";
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const authCtx = useContext(AuthContext);
    const { api } = authCtx;
    useEffect(() => {
        return () => {
            setIsLoading(false);
        };
    }, []);

    const logoutHandler = async (e) => {
        //Uvek mora da izloguje korisnika bez obzira da li je api prosao ili ne
        authCtx.logout();

        setIsLoading(true);
        await api
            .post(apiPath)
            .then((response) => {
                toast.success("Uspešno ste se odjavili!");
                navigate(`/`);
                api?.userDataUpdate(null);
                setIsLoading(false);
            })
            .catch((error) => {
                console.warn(error);
                setIsLoading(false);
            });
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

    // const StyledToggleButton = styled(Switch)({
    //     "& .MuiSwitch-thumb": {
    //         boxShadow: "0px 0px 10px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,2,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    //     },
    //     ".MuiSwitch-switchBase.Mui-checked": {
    //         color: "var(--main-color)",
    //         "&:hover": {
    //             backgroundColor: "rgba(255, 255, 255, 0.1)",
    //         },
    //     },
    // });

    return (
        <>
            <StyledNav>
                <Grid container alignItems="center" sx={{ flexWrap: "nowrap" }}>
                    <Box
                        sx={{
                            "@media (min-width: 900px)": {
                                display: "none",
                            },
                        }}
                    >
                        <img src={sideNavIcon} alt="Croonus" width={60} />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "inherit",
                            "@media (max-width: 899px)": {
                                justifyContent: "flex-end",
                            },
                        }}
                    >
                        <Grid
                            item
                            xs={1}
                            sx={{
                                pr: 1,
                                "@media (max-width: 900px)": {
                                    order: 1,
                                },
                            }}
                        >
                            <IconButton onClick={openSidenav}>
                                <DehazeIcon sx={{ color: "var(--third-color)" }} />
                            </IconButton>
                        </Grid>

                        <Grid container alignItems="center" width="auto">
                            {/* <Grid item>
                            <StyledToggleButton checked={activeTheme} onClick={changeTheme} name="themeSwitcher" inputProps={{ "aria-label": "toggle theme" }} />
                        </Grid> */}

                            <Grid item>
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{
                                        ml: 2,
                                        background: "var(--sidebar-bg-color)",
                                        color: "var(--main-bg-color)",
                                        padding: "0.8rem",
                                        "&:hover": {
                                            backgroundColor: "var(--sidebar-bg-color)",
                                        },
                                    }}
                                    aria-controls={open ? "account-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                >
                                    {authCtx.user?.user?.first_name?.charAt(0) + authCtx.user?.user?.last_name?.charAt(0)}
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
                                            right: "3rem",
                                            left: "auto !important",
                                            top: "3.5rem !important",
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
                                >
                                    <MenuItem
                                        onClick={(e) => {
                                            logoutHandler(e);
                                        }}
                                        sx={{
                                            "&:hover": {
                                                backgroundColor: "inherit",
                                                color: "inherit",
                                            },
                                        }}
                                    >
                                        Odjavite se
                                    </MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </StyledNav>
            {isLoading && <Loader size={50} />}
        </>
    );
};

export default Header;
