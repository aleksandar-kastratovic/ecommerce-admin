import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "./store/auth-contex";
import { useContext, useState, useEffect } from "react";
import SideNavigation from "./components/SideNavigation";
import Header from "./components/Header";
import RolesPage from "./pages/RolesPage";
import useHttp from "./hooks/use-http";
import UsersPage from "./pages/UsersPage";
import CategoriesPage from "./pages/CategoriesPage";
import { screensData } from "./helpers/const";
import Loader from "./components/UI/Loader";
import {
  referenceDataService,
  refreshTokenService,
  userScreensService,
} from "./helpers/services";
import ProductAttributesPage from "./pages/ProductAttributesPage";
import ProductsPage from "./pages/ProductsPage";
import LocationsPage from "./pages/LocationsPage";
import B2BCustomersPage from "./pages/B2BCustomersPage";
import CompaniesPage from "./pages/CompaniesPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SettingsPage from "./pages/SettingsPage";
import OrdersPage from "./pages/OrdersPage";
import B2Bsettings from "./pages/B2Bsettings/B2Bsettings";
import DetailsForm from "./pages/B2Bsettings/DetailsForm/DetailsForm";
import B2Bbanners from "./pages/B2Bbanners/B2Bbanners";
import DetailsBanners from "./pages/B2Bbanners/DetailsBanners/DetailsBanners";

function App() {
  const queryClient = new QueryClient();
  const authCtx = useContext(AuthContext);
  let navigate = useNavigate();
  let routerClass = "";
  const { isLoading, sendRequest: referenceDataRequest } = useHttp();
  const { isLoading2, sendRequest: userScreenRequest } = useHttp();

  const [sidenav, setSidenav] = useState(true);
  const [activeTheme, setActiveTheme] = useState(
    localStorage.getItem("theme") === "true" ?? false
  );

  useEffect(() => {
    if (authCtx.isRefreshingToken) {
      const setUserData = (userData) => {
        const expirationTime = new Date(
          new Date().getTime() + +userData.expires_in * 60 * 1000
        );

        authCtx.login(userData, expirationTime);
      };

      const refreshToken = async () => {
        const data = await refreshTokenService(referenceDataRequest);
        setUserData(data);
      };

      refreshToken();
    }
  }, [authCtx.isRefreshingToken]);

  useEffect(() => {
    if (authCtx.isTokenExpired) {
      toast.warning("Istekao Vam je token!");
      authCtx.changeTokenExpired(false);
      navigate(`/`);
    }
  }, [authCtx.isTokenExpired]);

  if (!authCtx.isLoggedIn) {
    routerClass = "";
  } else if (sidenav) {
    routerClass = "side-open router-container";
  } else {
    routerClass = "router-container";
  }
  if (activeTheme && authCtx.isLoggedIn) {
    document.body.classList.add("theme-dark");
    document.body.classList.remove("theme-light");
  } else {
    document.body.classList.add("theme-light");
    document.body.classList.remove("theme-dark");
  }

  useEffect(() => {
    const setReferenceData = (referenceData) => {
      authCtx.getReferenceData(referenceData);
    };

    const setUserScreens = (userScreens) => {
      authCtx.getUserScreens(userScreens);
    };

    if (authCtx.isLoggedIn) {
      const referenceData = async () => {
        const data = await referenceDataService(referenceDataRequest);
        setReferenceData(data);
      };

      referenceData();

      const userScreens = async () => {
        const data = await userScreensService(userScreenRequest);
        setUserScreens(data);
      };

      userScreens();
    }
  }, [referenceDataRequest, userScreenRequest, authCtx.isLoggedIn]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={routerClass}>
        {authCtx.isLoggedIn && (
          <>
            <SideNavigation
              activeTheme={activeTheme}
              userName={
                (authCtx.user.user.first_name
                  ? authCtx.user.user.first_name
                  : null) +
                " " +
                (authCtx.user.user.last_name
                  ? authCtx.user.user.last_name
                  : null)
              }
              // openSidenav = {() => { setSidenav(false); }}
            />
            <Header
              openSidenav={() => {
                setSidenav(!sidenav);
              }}
              changeTheme={() => {
                setActiveTheme(!activeTheme);
                localStorage.setItem("theme", !activeTheme);
              }}
              activeTheme={activeTheme}
            />
          </>
        )}
        <div className={authCtx.isLoggedIn ? "main-wrapper" : ""}>
          <Routes>
            {!authCtx.isLoggedIn && (
              <>
                <Route
                  path=""
                  exact
                  element={<Navigate replace to="/login" />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />}>
                  <Route path=":token" element={<ResetPasswordPage />} />
                </Route>
                <Route path="*" element={<Navigate replace to="/login" />} />
              </>
            )}
            {authCtx.isLoggedIn && (
              <>
                {/* <Route path='/' exact element={<Navigate replace to='/home' />} /> */}
                {/* <Route path='' element={<HomePage />} /> */}
                <Route
                  path=""
                  exact
                  element={<Navigate replace to="/orders" />}
                />
                {authCtx.userScreens !== undefined &&
                  authCtx.userScreens.map(function (object) {
                    if (object.id === screensData.ROLES.id) {
                      return (
                        <Route
                          key={object.id}
                          path="/roles"
                          element={<RolesPage routeData={screensData.ROLES} />}
                        >
                          <Route path=":roleId" element={<RolesPage />} />
                        </Route>
                      );
                    }
                    if (object.id === screensData.B2BCFG.id) {
                      return (
                        <Route key={object.id}>
                          <Route
                            key={object.id}
                            path="/B2B-settings"
                            element={
                              <B2Bsettings routeData={screensData.B2BCFG} />
                            }
                          />
                          <Route
                            path="/B2B-settings/:B2BId"
                            element={<DetailsForm />}
                          />
                        </Route>
                      );
                    }
                    if (object.id === screensData.USERS.id) {
                      return (
                        <Route
                          key={object.id}
                          path="/users"
                          element={<UsersPage routeData={screensData.USERS} />}
                        >
                          <Route path=":userId" element={<UsersPage />} />
                        </Route>
                      );
                    }
                    if (object.id === screensData.CATEG.id) {
                      return (
                        <Route
                          key={object.id}
                          path="/categories"
                          element={
                            <CategoriesPage routeData={screensData.CATEG} />
                          }
                        >
                          <Route path=":catId" element={<CategoriesPage />} />
                        </Route>
                      );
                    }
                    // TODO: Change screensData item
                    if (object.id === screensData.NEEWS.id) {
                      return (
                        <Route
                          key={object.id + 10}
                          path="/product-attributes"
                          element={
                            <ProductAttributesPage
                              routeData={screensData.CATEG}
                            />
                          }
                        >
                          <Route
                            path=":attId"
                            element={<ProductAttributesPage />}
                          />
                        </Route>
                      );
                    }
                    if (object.id === screensData.PRODU.id) {
                      return (
                        <Route
                          key={object.id}
                          path="/products"
                          element={
                            <ProductsPage routeData={screensData.PRODU} />
                          }
                        >
                          <Route path=":prodId" element={<ProductsPage />} />
                        </Route>
                      );
                    }
                    if (object.id === screensData.LOCAT.id) {
                      return (
                        <Route
                          key={object.id}
                          path="/locations"
                          element={
                            <LocationsPage routeData={screensData.LOCAT} />
                          }
                        >
                          <Route path=":locId" element={<LocationsPage />} />
                        </Route>
                      );
                    }
                    // if (object.id === screensData.ACTON.id) {
                    //   return  <Route key={object.id}  path='/actions' element={<ActionsPage routeData={screensData.ACTON} />} >
                    //             <Route path=":actId" element={<ActionsPage />} />
                    //           </Route>
                    // }
                    if (object.id === screensData.CUSTM.id) {
                      return (
                        <Route
                          key={object.id}
                          path="/b2b-customers"
                          element={
                            <B2BCustomersPage routeData={screensData.CUSTM} />
                          }
                        >
                          <Route path=":cusId" element={<B2BCustomersPage />} />
                        </Route>
                      );
                    }
                    // TODO: Change screensData item
                    if (object.id === screensData.COMPN.id) {
                      return (
                        <Route
                          key={object.id}
                          path="/companies"
                          element={
                            <CompaniesPage routeData={screensData.COMPN} />
                          }
                        >
                          <Route path=":comId" element={<CompaniesPage />} />
                        </Route>
                      );
                    }
                    if (object.id === screensData.ORDER.id) {
                      return (
                        <Route
                          key={object.id}
                          path="/orders"
                          element={<OrdersPage routeData={screensData.ORDER} />}
                        >
                          <Route path=":ordId" element={<OrdersPage />} />
                        </Route>
                      );
                    }
                    // TODO: Change screensData item
                    if (object.id === screensData.B2BCFG.id) {
                      return (
                        <Route
                          key={object.id}
                          path="/settings"
                          element={
                            <SettingsPage routeData={screensData.B2BCFG} />
                          }
                        />
                      );
                    }
                    if (object.id === screensData.BANNERS_B2B.id) {
                      return (
                        <Route key={object.id}>
                          <Route
                            key={object.id}
                            path="/B2B-banners"
                            element={
                              <B2Bbanners routeData={screensData.BANNERS_B2B} />
                            }
                          />
                          <Route
                            path="/B2B-banners/:B2BId"
                            element={<DetailsBanners />}
                          />
                        </Route>
                      );
                    }
                  })}
              </>
            )}
            <Route
              path="*"
              element={<NotFound routeData={screensData.not_found} />}
            />
          </Routes>
        </div>
        <ToastContainer theme="colored" position="top-right" />
        {(isLoading || isLoading2) && <Loader />}
      </div>
    </QueryClientProvider>
  );
}

export default App;
