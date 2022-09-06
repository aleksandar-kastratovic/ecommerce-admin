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
    faPercentage
} from "@fortawesome/free-solid-svg-icons"
import Countries from "../pages/Countries/Countries"
import CountriesDetails from "../pages/Countries/CountriesDetails/CountriesDetails"
import Towns from "../pages/Towns/Towns"
import TownsDetails from "../pages/Towns/TownsDetails/TownsDetails"
import Streets from "../pages/Streets/Streets"
import StreetsDetails from "../pages/Streets/StreetsDetails/StreetsDetails"
import Brands from "../pages/Brands/Brands"
import BrandsDetails from "../pages/Brands/BrandsDetails/BrandsDetails"
import Stores from "../pages/Stores/Stores"
import StoresDetails from "../pages/Stores/StoresDetails/StoresDetails"
import Municipalities from "../pages/Municipalities/Municipalities"
import MunicipalitiesDetails from "../pages/Municipalities/MunicipalitiesDetails/MunicipalitiesDetails"
import Manufacturers from "../pages/Manufacturers/Manufacturers"
import ManufacturersDetails from "../pages/Manufacturers/ManufacturersDetails/ManufacturersDetails"
import ProductDetails from "../pages/Products/ProductDetails/ProductDetails"
import ProductGroupDetails from "../pages/ProductSpecs/ProductGroupDetails/ProductGroupDetails"
import ProductSpecs from "../pages/ProductSpecs/ProductSpecs"
import ProductSpecsGroups from "../pages/ProductSpecs/ProductSpecsGroups"
import ProductSpecsDetails from "../pages/ProductSpecs/ProductsSpecsDetails/ProductSpecsDetails"
import AdminForms from "./../pages/AdminForms/AdminForms"
import DetailsAdminForm from "./../pages/AdminForms/DetailsAdminForm/DetailsAdminForm"
import News from "./../pages/News/News"
import NewsDetails from "./../pages/News/NewsDetails/NewsDetails"
import NewsCategoryList from "./../pages/NewsCategoryList/NewsCategoryList"
import NewsCategoryListDetails from "./../pages/NewsCategoryList/NewsCategoryListDetails/NewsCategoryListDetails"
import B2Bbanners from "./../pages/B2Bbanners/B2Bbanners"
import DetailsBanners from "./../pages/B2Bbanners/DetailsBanners/DetailsBanners"
import StaticPages from "../pages/StaticPages/StaticPages"
import StaticPagesDetails from "../pages/StaticPages/StaticPagesDetails/StaticPagesDetails"
import Newsletter from "../pages/Newsletter/Newsletter"
import ContactForm from "../pages/ContactForm/ContactForm"
import B2BCustomersPage from "./../pages/B2BCustomersPage"
import B2Bsettings from "./../pages/B2Bsettings/B2Bsettings"
import DetailsForm from "./../pages/B2Bsettings/DetailsForm/DetailsForm"
import B2Cbanners from "./../pages/B2Cbanners/B2Cbanners"
import DetailsBannersB2C from "./../pages/B2Cbanners/DetailsBanners/DetailsBannersB2C"
import B2CSettings from "./../pages/B2CSettings/B2CSettings"
import CompaniesPage from "./../pages/CompaniesPage"
import ImportSteps from "./../pages/Import/ImportSteps"
import LocationsPage from "./../pages/LocationsPage"
import OrdersPage from "./../pages/OrdersPage"
import DetailsParams from "./../pages/Params/DetailsParams/DetailsParams"
import Params from "./../pages/Params/Params"
import Products from "./../pages/Products/Products"
import RolesPage from "./../pages/RolesPage"
import UsersPage from "./../pages/UsersPage"
import Categories from "../pages/Categories/Categories"
import CategoriesDetails from "../pages/Categories/CategoriesDetails/CategoriesDetails"

import { makeScreen, MenuGroup } from "./utils"
import CategoriesList from "../pages/Categories/CategoriesList/CategoriseList"
import CategoriesTree from "../pages/Categories/CategoriesTree/CategoriesTree"
import GroupDetails from "../pages/Categories/GroupDetails/GroupDetails"
import Companies from "../pages/Companies/Companies"
import CompaniesDetails from "../pages/Companies/CompaniesDetails/CompaniesDetails"
import SaleOfficers from "../pages/SaleOfficers/SaleOfficers"
import SaleOfficersDetails from "../pages/SaleOfficers/SaleOfficersDetails/SaleOfficersDetails"
import B2BbannersPositions from "../pages/B2BbannersPositions/B2BbannersPositions"
import B2BPositionDetails from "../pages/B2BbannersPositions/DetailsPage/B2BPositionDetails"
import B2CbannersPositions from "../pages/B2CbannersPositions/B2CbannersPositions"
import B2CPositionDetails from "../pages/B2CbannersPositions/DetailsPage/B2CPositionDetails"

/** The list of available screens. */
const { PRODUCT, B2B, B2C, SETTINGS, TOOLS } = MenuGroup
const screens = {
    CATEG       : [
        "/categories",
        "Kategorije",
        faSitemap,
        PRODUCT,
        Categories,
        [
            [ ":gid", GroupDetails ],
            [ "tree/:gid", CategoriesTree ],
            [ "category/:gid", CategoriesList ],
            [ "category/:gid/:cid", CategoriesDetails ]
        ]
    ],
    PRODU       : [
        "/products",
        "Proizvodi",
        faArchive,
        PRODUCT,
        Products,
        [ [ ":prodId", ProductDetails ] ]
    ],
    PRODUCT_SPEC: [
        "/product-specs",
        "Specifikacija",
        faArchive,
        PRODUCT,
        ProductSpecs,
        [
            [ ":specId", ProductSpecsDetails ],
            [ "groups", ProductSpecsGroups ],
            [ "groups/:groupId", ProductGroupDetails ]
        ]
    ],

    ORDER            : [
        "/orders",
        "Porudžbine",
        faFileAlt,
        B2B,
        OrdersPage,
        [ [ ":ordId", OrdersPage ] ]
    ],
    COMPN            : [
        "/companies",
        "Kompanije",
        faCity,
        B2B,
        Companies,
        [ [ ":comId", CompaniesDetails ] ]
    ],
    REBATES          : [
        "/rebates",
        "Rabati", faPercentage, B2B,
        RebatesListPage,
        [ [ ":rebateId", RebatesListPage ] ]
    ],
    BANNERS_B2B      : [
        "/B2B-banners",
        "Baneri",
        faImage,
        B2B,
        B2Bbanners,
        [
            [ ":B2BId", DetailsBanners ],
            [ "positions", B2BbannersPositions ],
            [ "positions/:id", B2BPositionDetails ]
        ]
    ],
    B2B_SALES_OFFICER: [
        "/B2B-sales-officers",
        "Komercijalisti",
        faCog,
        B2B,
        SaleOfficers,
        [ [ ":id", SaleOfficersDetails ] ]
    ],

    BANNERS_B2C      : [
        "/B2C-banners",
        "Baneri",
        faCog,
        B2C,
        B2Cbanners,
        [
            [ ":B2CId", DetailsBannersB2C ],
            [ "positions", B2CbannersPositions ],
            [ "positions/:id", B2CPositionDetails ]
        ]
    ],
    B2C_NEWS         : [
        "/news",
        "Vesti",
        faArchive,
        B2C,
        News,
        [
            [ ":nid", NewsDetails ],
            [ "category", NewsCategoryList ],
            [ "category/:cid", NewsCategoryListDetails ]
        ]
    ],
    B2C_STATIC_PAGES : [
        "/staticpages",
        "Statičke strane",
        faArchive,
        B2C,
        StaticPages,
        [ [ ":spid", StaticPagesDetails ] ]
    ],
    B2C_NEWSLETTER   : [
        "/newsletter",
        "Newsletter",
        faArchive,
        B2C,
        Newsletter,
        [ [ ":nlid", Newsletter ] ]
    ],
    B2C_CONTACT_FORMS: [
        "/contactform",
        "Kontakt forma",
        faArchive,
        B2C,
        ContactForm,
        [ [ ":cfid", ContactForm ] ]
    ],

    ROLES         : [
        "/roles",
        "Uloge",
        faPeopleArrows,
        SETTINGS,
        RolesPage,
        [ [ ":roleId", RolesPage ] ]
    ],
    USERS         : [
        "/users",
        "Korisnici",
        faUsers,
        SETTINGS,
        UsersPage,
        [ [ ":userId", UsersPage ] ]
    ],
    LOCAT         : [
        "/locations",
        "Lokacije",
        faSearchLocation,
        SETTINGS,
        LocationsPage,
        [ [ ":locId", LocationsPage ] ]
    ],
    PARAMS        : [
        "/params",
        "Parametri",
        faCog,
        SETTINGS,
        Params,
        [ [ ":pid", DetailsParams ] ]
    ],
    COUNTRIES     : [
        "/countries",
        "Države",
        faFlag,
        SETTINGS,
        Countries,
        [ [ ":cid", CountriesDetails ] ]
    ],
    MUNICIPALITIES: [
        "/municipalities",
        "Opštine",
        faCity,
        SETTINGS,
        Municipalities,
        [ [ ":mid", MunicipalitiesDetails ] ]
    ],
    TOWNS         : [
        "/towns",
        "Mesta",
        faBuilding,
        SETTINGS,
        Towns,
        [ [ ":id", TownsDetails ] ]
    ],
    STREETS       : [
        "/streets",
        "Ulice",
        faRoad,
        SETTINGS,
        Streets,
        [ [ ":sid", StreetsDetails ] ]
    ],
    BRANDS        : [
        "/brands",
        "Brendovi",
        faCopyright,
        SETTINGS,
        Brands,
        [ [ ":bid", BrandsDetails ] ]
    ],
    STORES        : [
        "/stores",
        "Skladišta",
        faStore,
        SETTINGS,
        Stores,
        [ [ ":ssid", StoresDetails ] ]
    ],
    MANUFACTURERS : [
        "/manufacturers",
        "Proizvođači",
        faIndustry,
        SETTINGS,
        Manufacturers,
        [ [ ":mmid", ManufacturersDetails ] ]
    ],

    B2BCFG: [
        "/B2B-settings",
        "B2B podešavanja",
        faCog,
        TOOLS,
        B2Bsettings,
        [ [ ":B2BId", DetailsForm ] ]
    ],
    IMPORT: [ "/import", "Uvoz podataka", faUpload, TOOLS, ImportSteps ],

    B2CCFG    : [
        "/B2C-settings",
        "B2C podešavanja",
        faCog,
        TOOLS,
        B2CSettings,
        [ [ ":B2CId", B2CSettings ] ]
    ],
    ADMIN_FORM: [
        "/admin-form",
        "Admin forme",
        faList,
        TOOLS,
        AdminForms,
        [ [ ":FormId", DetailsAdminForm ] ]
    ]
}

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
export const availableScreens: AvailableScreen[] = {}
for (const code in screens) {
    availableScreens[code] = makeScreen(screens[code])
}
