import {
  faFileAlt,
  faCity,
  faCog,
  faUserTag,
  faSitemap,
  faArchive,
  faSearchLocation,
  faUsers,
  faPeopleArrows,
  faImage,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import Countries from "../pages/Countries/Countries";
import CountriesDetails from "../pages/Countries/CountriesDetails/CountriesDetails";
import Municipalities from "../pages/Municipalities/Municipalities";
import ProductDetails from "../pages/Products/ProductDetails/ProductDetails";
import AdminForms from "./../pages/AdminForms/AdminForms";
import DetailsAdminForm from "./../pages/AdminForms/DetailsAdminForm/DetailsAdminForm";
import B2Bbanners from "./../pages/B2Bbanners/B2Bbanners";
import DetailsBanners from "./../pages/B2Bbanners/DetailsBanners/DetailsBanners";
import B2BCustomersPage from "./../pages/B2BCustomersPage";
import B2Bsettings from "./../pages/B2Bsettings/B2Bsettings";
import DetailsForm from "./../pages/B2Bsettings/DetailsForm/DetailsForm";
import B2Cbanners from "./../pages/B2Cbanners/B2Cbanners";
import DetailsBannersB2C from "./../pages/B2Cbanners/DetailsBanners/DetailsBannersB2C";
import B2CSettings from "./../pages/B2CSettings/B2CSettings";
import CategoriesPage from "./../pages/CategoriesPage";
import CompaniesPage from "./../pages/CompaniesPage";
import ImportSteps from "./../pages/Import/ImportSteps";
import LocationsPage from "./../pages/LocationsPage";
import OrdersPage from "./../pages/OrdersPage";
import DetailsParams from "./../pages/Params/DetailsParams/DetailsParams";
import Params from "./../pages/Params/Params";
import Products from "./../pages/Products/Products";
import RolesPage from "./../pages/RolesPage";
import UsersPage from "./../pages/UsersPage";
import { makeScreen, MenuGroup } from "./utils";

/** The list of available screens. */
const { PRODUCT, B2B, B2C, SETTINGS, TOOLS } = MenuGroup;
const screens = {
  CATEG: [
    "/categories",
    "Kategorije",
    faSitemap,
    PRODUCT,
    CategoriesPage,
    [[":catId", CategoriesPage]],
  ],
  PRODU: [
    "/products",
    "Proizvodi",
    faArchive,
    PRODUCT,
    Products,
    [[":prodId", ProductDetails]],
  ],

  ORDER: [
    "/orders",
    "Porudžbine",
    faFileAlt,
    B2B,
    OrdersPage,
    [[":ordId", OrdersPage]],
  ],
  COMPN: [
    "/companies",
    "Kompanije",
    faCity,
    B2B,
    CompaniesPage,
    [[":comId", CompaniesPage]],
  ],
  CUSTM: [
    "/b2b-customers",
    "Kupci",
    faUserTag,
    B2B,
    B2BCustomersPage,
    [[":cusId", B2BCustomersPage]],
  ],
  BANNERS_B2B: [
    "/B2B-banners",
    "B2B baneri",
    faImage,
    B2B,
    B2Bbanners,
    [[":B2BId", DetailsBanners]],
  ],
  B2BCFG: [
    "/B2B-settings",
    "B2B podešavanja",
    faCog,
    B2B,
    B2Bsettings,
    [[":B2BId", DetailsForm]],
  ],

  BANNERS_B2C: [
    "/B2C-banners",
    "B2C baneri",
    faCog,
    B2C,
    B2Cbanners,
    [[":B2CId", DetailsBannersB2C]],
  ],
  B2CCFG: [
    "/B2C-settings",
    "B2C podešavanja",
    faCog,
    B2C,
    B2CSettings,
    [[":B2CId", B2CSettings]],
  ],

  ROLES: [
    "/roles",
    "Uloge",
    faPeopleArrows,
    SETTINGS,
    RolesPage,
    [[":roleId", RolesPage]],
  ],
  USERS: [
    "/users",
    "Korisnici",
    faUsers,
    SETTINGS,
    UsersPage,
    [[":userId", UsersPage]],
  ],
  ADMIN_FORM: [
    "/admin-form",
    "Admin forme",
    faCog,
    SETTINGS,
    AdminForms,
    [[":FormId", DetailsAdminForm]],
  ],
  LOCAT: [
    "/locations",
    "Lokacije",
    faSearchLocation,
    SETTINGS,
    LocationsPage,
    [[":locId", LocationsPage]],
  ],
  PARAMS: [
    "/params",
    "Parametri",
    faCog,
    SETTINGS,
    Params,
    [[":pid", DetailsParams]],
  ],
  COUNTRIES: [
    "/countries",
    "Države",
    faCog,
    SETTINGS,
    Countries,
    [[":cid", CountriesDetails]],
  ],
  MUNICIPALITIES: [
    "/municipalities",
    "Opštine",
    faCog,
    SETTINGS,
    Municipalities,
    [],
  ],

  IMPORT: ["/import", "Uvoz podataka", faUpload, TOOLS, ImportSteps],
};

/**
 * Builds the screens from the configuration above.
 *
 * @typedef AvailableScreen
 *    @property {string} name
 *    @property {string} path
 *    @property {JSX.Element} icon
 *    @property {string} group
 *    @property {JSX.Element} component
 *    @property {AvailableScreen[]} children
 */
export const availableScreens: AvailableScreen[] = {};
for (const code in screens) {
  availableScreens[code] = makeScreen(screens[code]);
}
