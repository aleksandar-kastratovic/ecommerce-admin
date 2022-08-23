import {
  faFileAlt,
  faCity,
  faPercentage,
  faCog,
  faUserTag,
  faSitemap,
  faArchive,
  faSearchLocation,
  faUsers,
  faPeopleArrows,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

export const MainMenuGroups = {
  PRODUCT: { order: 0, name: "Katalog" },
  B2B: { order: 1, name: "B2B" },
  B2C: { order: 2, name: "B2C" },
  SETTINGS: { order: 3, name: "Podešavanja" },
};

const screenDateDef = [
  ["CATEG", "Kategorije", "/categories", faSitemap, MainMenuGroups.PRODUCT],
  ["PRODU", "Proizvodi", "/products", faArchive, MainMenuGroups.PRODUCT],
  ["LOCAT", "Lokacije", "/locations", faSearchLocation, MainMenuGroups.PRODUCT],

  ["ORDER", "Porudžbine", "/orders", faFileAlt, MainMenuGroups.B2B],
  ["COMPN", "Kompanije", "/companies", faCity, MainMenuGroups.B2B],
  ["CUSTM", "Kupci", "/b2b-customers", faUserTag, MainMenuGroups.B2B],
  ["BANNR", "Baneri", "/", faSitemap, MainMenuGroups.B2B],
  ["NEEWS", "Novosti", "/", faArchive, MainMenuGroups.B2B],
  ["ADMIN_FORM", "Admin forme", "/admin-form", faCog, MainMenuGroups.SETTINGS],
  ["BANNERS_B2B", "B2B baneri", "/B2B-banners", faImage, MainMenuGroups.B2B],
  ["BANNERS_B2C", "B2C baneri", "/B2C-banners", faCog, MainMenuGroups.B2C],

  ["ROLES", "Uloge", "/roles", faPeopleArrows, MainMenuGroups.SETTINGS],
  ["USERS", "Korisnici", "/users", faUsers, MainMenuGroups.SETTINGS],
  ["ACTON", "Akcije", "/", faPercentage, MainMenuGroups.SETTINGS],
  ["B2BCFG", "B2B podešavanja", "/B2B-settings", faCog, MainMenuGroups.B2C],
  ["B2CCFG", "B2C podešavanja", "/B2C-settings", faCog, MainMenuGroups.B2C],
  ["PARAMS", "Parametri", "/params", faCog, MainMenuGroups.SETTINGS],
];

export const easyScreensData = screenDateDef.map((item) => ({
  screen_code: item[0],
  name: item[1],
  path: item[2],
  icon: item[3],
  group: item[4],
}));

export const screensData = easyScreensData.reduce((acc, screen) => {
  acc[screen.screen_code] = screen;
  return acc;
}, {});

export const inventoryOptions = [
  { id: 1, name: "Više lokacija" },
  { id: null, name: "Jedna lokacija" },
];

export const regax =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
