import {
    faFileAlt,
    faCity,
    faCog,
    faSitemap,
    faArchive,
    faSearchLocation,
    faUsers,
    faPeopleArrows,
    faImage,
    faUpload,
    faList,
    faFlag,
    faBuilding,
    faRoad,
    faCopyright,
    faIndustry,
    faStore,
    faBell,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import IconList from "../helpers/icons";
import B2BRebatesDetails from "../pages/B2BRebates/B2BRebatesDetails/B2BRebatesDetails";
import B2BRebatesListPage from "../pages/B2BRebates/B2BRebatesListPage";
import B2BRebateTiersDetails from "../pages/B2BRebateTiers/B2BRebatesDetails/B2BRebateTiersDetails";
import B2BRebateTiersListPage from "../pages/B2BRebateTiers/B2BRebateTiersListPage";
import Countries from "../pages/Countries/Countries";
import CountriesDetails from "../pages/Countries/CountriesDetails/CountriesDetails";
import PricesGroupsDetails from "../pages/PricesGroups/Details/PricesGroupsDetails";
import PricesGroupsListPage from "../pages/PricesGroups/PricesGroupsListPage";
import Towns from "../pages/Towns/Towns";
import TownsDetails from "../pages/Towns/TownsDetails/TownsDetails";
import Streets from "../pages/Streets/Streets";
import StreetsDetails from "../pages/Streets/StreetsDetails/StreetsDetails";
import Brands from "../pages/Brands/Brands";
import BrandsDetails from "../pages/Brands/BrandsDetails/BrandsDetails";
import Stores from "../pages/Stores/Stores";
import StoresDetails from "../pages/Stores/StoresDetails/StoresDetails";
import Municipalities from "../pages/Municipalities/Municipalities";
import MunicipalitiesDetails from "../pages/Municipalities/MunicipalitiesDetails/MunicipalitiesDetails";
import Manufacturers from "../pages/Manufacturers/Manufacturers";
import ManufacturersDetails from "../pages/Manufacturers/ManufacturersDetails/ManufacturersDetails";
import ProductDetails from "../pages/Products/ProductDetails/ProductDetails";
import ProductGroupDetails from "../pages/ProductSpecs/ProductGroupDetails/ProductGroupDetails";
import ProductSpecs from "../pages/ProductSpecs/ProductSpecs";
import ProductSpecsGroups from "../pages/ProductSpecs/ProductSpecsGroups";
import ProductSpecsDetails from "../pages/ProductSpecs/ProductsSpecsDetails/ProductSpecsDetails";
import AdminForms from "./../pages/AdminForms/AdminForms";
import DetailsAdminForm from "./../pages/AdminForms/DetailsAdminForm/DetailsAdminForm";
import News from "./../pages/News/News";
import NewsDetails from "./../pages/News/NewsDetails/NewsDetails";
import NewsCategoryList from "./../pages/NewsCategoryList/NewsCategoryList";
import NewsCategoryListDetails from "./../pages/NewsCategoryList/NewsCategoryListDetails/NewsCategoryListDetails";
import B2Bbanners from "./../pages/B2Bbanners/B2Bbanners";
import DetailsBanners from "./../pages/B2Bbanners/DetailsBanners/DetailsBanners";
import StaticPages from "../pages/StaticPages/StaticPages";
import StaticPagesDetails from "../pages/StaticPages/StaticPagesDetails/StaticPagesDetails";
import Newsletter from "../pages/Newsletter/Newsletter";
import ContactForm from "../pages/ContactForm/ContactForm";
import B2Bsettings from "./../pages/B2Bsettings/B2Bsettings";
import B2Cbanners from "./../pages/B2Cbanners/B2Cbanners";
import DetailsBannersB2C from "./../pages/B2Cbanners/DetailsBanners/DetailsBannersB2C";
import B2CSettings from "./../pages/B2CSettings/B2CSettings";
import ImportSteps from "./../pages/Import/ImportSteps";
import LocationsPage from "./../pages/LocationsPage";
import DetailsParams from "./../pages/Params/DetailsParams/DetailsParams";
import Params from "./../pages/Params/Params";
import Products from "./../pages/Products/Products";
import CategoriesGroupsListPage from "../pages/Categories/CategoriesGroupsListPage";
import CategoriesDetails from "../pages/Categories/CategoriesDetails/CategoriesDetails";
import Notifications from "../pages/Notifications/Notifications";
import NotificationsDetails from "../pages/Notifications/NotificationsDetails/NotificationsDetails";
import { makeScreen, MenuGroup } from "./utils";
import CategoriesListPage from "../pages/Categories/CategoriesList/CategoriseListPage";
import CategoriesTree from "../pages/Categories/CategoriesTree/CategoriesTree";
import GroupDetails from "../pages/Categories/GroupDetails/GroupDetails";
import Companies from "../pages/Companies/Companies";
import CompaniesDetails from "../pages/Companies/CompaniesDetails/CompaniesDetails";
import SaleOfficers from "../pages/SaleOfficers/SaleOfficers";
import SaleOfficersDetails from "../pages/SaleOfficers/SaleOfficersDetails/SaleOfficersDetails";
import B2BbannersPositions from "../pages/B2BbannersPositions/B2BbannersPositions";
import B2BPositionDetails from "../pages/B2BbannersPositions/DetailsPage/B2BPositionDetails";
import B2CbannersPositions from "../pages/B2CbannersPositions/B2CbannersPositions";
import B2CPositionDetails from "../pages/B2CbannersPositions/DetailsPage/B2CPositionDetails";
import B2BOrders from "../pages/B2BOrders/B2BOrders";
import B2BOrdersDetails from "../pages/B2BOrders/Details/B2BOrdersDetails";
import RolesListPage from "../pages/Roles/RolesListPage";
import RolesDetailsPage from "../pages/Roles/Details/RolesDetailsPage";
import Users from "../pages/Users/Users";
import UsersDetils from "../pages/Users/Details/UsersDetails";
import B2BSettingsDetails from "../pages/B2Bsettings/SettingsDetails/B2BSettingsDetails";
import B2CSettingsDetails from "../pages/B2CSettings/SettingsDetails/B2CSettingsDetails";
import B2BContactForm from "../pages/B2BContactForm/B2BContactForm";
import B2BContactFormDetails from "../pages/B2BContactForm/Details/B2BContactFormDetails";
import B2COrders from "../pages/B2COrders/B2COrders";
import B2COrdersDetails from "../pages/B2COrders/Details/B2COrdersDetails";

/** The list of available screens. */
const { PRODUCT, B2B, B2C, SETTINGS, TOOLS } = MenuGroup;
const screens = {
    CATEG: [
        "/categories",
        "Kategorije",
        faSitemap,
        PRODUCT,
        CategoriesGroupsListPage,
        [
            [":gid", GroupDetails],
            ["tree/:gid", CategoriesTree],
            ["category/:gid", CategoriesListPage],
            ["category/:gid/:cid", CategoriesDetails],
        ],
    ],
    PRODU: [
        "/products",
        "Proizvodi",
        faArchive,
        PRODUCT,
        Products,
        [
            [":prodId", ProductDetails],
            ["prices-groups", PricesGroupsListPage],
            ["prices-groups/:priceGroupId", PricesGroupsDetails],
        ],
    ],
    PRODUCT_SPEC: [
        "/product-specs",
        "Specifikacija",
        faArchive,
        PRODUCT,
        ProductSpecs,
        [
            [":specId", ProductSpecsDetails],
            ["groups", ProductSpecsGroups],
            ["groups/:groupId", ProductGroupDetails],
        ],
    ],
    B2B_ORDERS: ["/b2b-orders", "Porudžbine", IconList.fileOpen, B2B, B2BOrders, [[":orderId", B2BOrdersDetails]]],
    COMPN: ["/companies", "Kompanije", faCity, B2B, Companies, [[":comId", CompaniesDetails]]],
    REBATE_TIERS: ["/b2b/rebate_tiers", "Rabatne skale", IconList.barChart, B2B, B2BRebateTiersListPage, [[":rebateTierId", B2BRebateTiersDetails]]],
    REBATES: ["/b2b/rebates", "Rabati", IconList.percent, B2B, B2BRebatesListPage, [[":rebateId", B2BRebatesDetails]]],
    BANNERS_B2B: [
        "/B2B-banners",
        "Baneri",
        faImage,
        B2B,
        B2Bbanners,
        [
            [":B2BId", DetailsBanners],
            ["positions", B2BbannersPositions],
            ["positions/:id", B2BPositionDetails],
        ],
    ],
    B2B_SALES_OFFICER: ["/B2B-sales-officers", "Komercijalisti", faCog, B2B, SaleOfficers, [[":id", SaleOfficersDetails]]],
    B2B_NOTIFICATIONS: ["/notifications", "Notifikacije", faBell, B2B, Notifications, [[":notifid", NotificationsDetails]]],
    B2B_CONTACT_FORMS: ["/B2B-contact", "Kontakt forma", faEnvelope, B2B, B2BContactForm, [[":id", B2BContactFormDetails]]],

    BANNERS_B2C: [
        "/B2C-banners",
        "Baneri",
        faCog,
        B2C,
        B2Cbanners,
        [
            [":B2CId", DetailsBannersB2C],
            ["positions", B2CbannersPositions],
            ["positions/:id", B2CPositionDetails],
        ],
    ],
    B2C_NEWS: [
        "/news",
        "Vesti",
        faArchive,
        B2C,
        News,
        [
            [":nid", NewsDetails],
            ["category", NewsCategoryList],
            ["category/:cid", NewsCategoryListDetails],
        ],
    ],
    B2C_STATIC_PAGES: ["/staticpages", "Statičke strane", faArchive, B2C, StaticPages, [[":spid", StaticPagesDetails]]],
    B2C_NEWSLETTER: ["/newsletter", "Newsletter", faArchive, B2C, Newsletter, [[":nlid", Newsletter]]],
    B2C_CONTACT_FORMS: ["/contactform", "Kontakt forma", faEnvelope, B2C, ContactForm, [[":cfid", ContactForm]]],
    B2C_ORDERS: ["/b2c-orders", "Porudžbine", IconList.fileOpen, B2C, B2COrders, [[":orderId", B2COrdersDetails]]],

    ROLES: ["/roles", "Uloge", faPeopleArrows, SETTINGS, RolesListPage, [[":roleId", RolesDetailsPage]]],
    USERS: ["/users", "Korisnici", faUsers, SETTINGS, Users, [[":userId", UsersDetils]]],
    LOCAT: ["/locations", "Lokacije", faSearchLocation, SETTINGS, LocationsPage, [[":locId", LocationsPage]]],
    PARAMS: ["/params", "Parametri", faCog, SETTINGS, Params, [[":pid", DetailsParams]]],
    COUNTRIES: ["/countries", "Države", faFlag, SETTINGS, Countries, [[":cid", CountriesDetails]]],
    MUNICIPALITIES: ["/municipalities", "Opštine", faCity, SETTINGS, Municipalities, [[":mid", MunicipalitiesDetails]]],
    TOWNS: ["/towns", "Mesta", faBuilding, SETTINGS, Towns, [[":id", TownsDetails]]],
    STREETS: ["/streets", "Ulice", faRoad, SETTINGS, Streets, [[":sid", StreetsDetails]]],
    BRANDS: ["/brands", "Brendovi", faCopyright, SETTINGS, Brands, [[":bid", BrandsDetails]]],
    STORES: ["/stores", "Skladišta", faStore, SETTINGS, Stores, [[":ssid", StoresDetails]]],
    MANUFACTURERS: ["/manufacturers", "Proizvođači", faIndustry, SETTINGS, Manufacturers, [[":mmid", ManufacturersDetails]]],
    B2BCFG: ["/B2B-settings", "B2B podešavanja", faCog, TOOLS, B2Bsettings, [[":B2BId", B2BSettingsDetails]]],
    IMPORT: ["/import", "Uvoz podataka", faUpload, TOOLS, ImportSteps],
    B2CCFG: ["/B2C-settings", "B2C podešavanja", faCog, TOOLS, B2CSettings, [[":B2CId", B2CSettingsDetails]]],
    ADMIN_FORM: ["/admin-form", "Admin forme", faList, TOOLS, AdminForms, [[":FormId", DetailsAdminForm]]],
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
