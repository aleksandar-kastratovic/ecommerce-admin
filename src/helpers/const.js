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
} from "@fortawesome/free-solid-svg-icons";

export const MainMenuGroups = {
  PRODUCT: { order: 0, name: "Katalog" },
  B2B: { order: 1, name: "B2B" },
  SETTINGS: { order: 2, name: "Podešavanja" },
};

const screenDateDef = [
  [1, "PRODU", "Proizvodi", "/products", faArchive, MainMenuGroups.PRODUCT],
  [2, "ORDER", "Porudžbine", "/orders", faFileAlt, MainMenuGroups.B2B],
  [3, "BANNR", "Baneri", "/", faSitemap, MainMenuGroups.B2B],
  [4, "NEEWS", "Novosti", "/", faArchive, MainMenuGroups.B2B],
  [5, "CATEG", "Kategorije", "/categories", faSitemap, MainMenuGroups.PRODUCT],
  [6, "ROLES", "Uloge", "/roles", faPeopleArrows, MainMenuGroups.SETTINGS],
  [7, "USERS", "Korisnici", "/users", faUsers, MainMenuGroups.SETTINGS],
  [8, "ACTON", "Akcije", "/", faPercentage, MainMenuGroups.SETTINGS],
  [9, "CUSTM", "Kupci", "/b2b-customers", faUserTag, MainMenuGroups.B2B],
  [
    10,
    "LOCAT",
    "Lokacije",
    "/locations",
    faSearchLocation,
    MainMenuGroups.PRODUCT,
  ],
  [11, "COMPN", "Kompanije", "/companies", faCity, MainMenuGroups.B2B],
  // [12, 'SETNG', 'Podešavanja', '/', faCog, MainMenuGroups.SETTINGS ],
  [
    12,
    "B2BCONFIG",
    "B2B podešavanja",
    "/B2B-settings",
    faCog,
    MainMenuGroups.SETTINGS,
  ],
];

export const easyScreensData = screenDateDef.map((item) => ({
  id: item[0],
  screen_code: item[1],
  name: item[2],
  path: item[3],
  icon: item[4],
  group: item[5],
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

export const apiLocal = "http://127.0.0.1:8000/api/v1/";
