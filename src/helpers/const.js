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
  faUpload
} from "@fortawesome/free-solid-svg-icons"

export const MainMenuGroups = {
  PRODUCT : { order: 0, name: "Katalog" },
  B2B     : { order: 1, name: "B2B" },
  SETTINGS: { order: 2, name: "Podešavanja" },
  TOOLS   : { order: 3, name: "Alati" }
}

const screenDateDef = [
  [ "CATEG", "Kategorije", "/categories", faSitemap, MainMenuGroups.PRODUCT ],
  [ "PRODU", "Proizvodi", "/products", faArchive, MainMenuGroups.PRODUCT ],
  [ "ACTON", "Akcije", "/", faPercentage, MainMenuGroups.SETTINGS ],

  [ "ORDER", "Porudžbine", "/orders", faFileAlt, MainMenuGroups.B2B ],
  [ "COMPN", "Kompanije", "/companies", faCity, MainMenuGroups.B2B ],
  [ "CUSTM", "Kupci", "/b2b-customers", faUserTag, MainMenuGroups.B2B ],
  [ "BANNR", "Baneri", "/", faSitemap, MainMenuGroups.B2B ],
  [ "NEEWS", "Novosti", "/", faArchive, MainMenuGroups.B2B ],
  [ "BANNERS_B2B", "B2B baneri", "/B2B-banners", faImage, MainMenuGroups.B2B ],

  [ "ROLES", "Uloge", "/roles", faPeopleArrows, MainMenuGroups.SETTINGS ],
  [ "USERS", "Korisnici", "/users", faUsers, MainMenuGroups.SETTINGS ],
  [ "B2BCFG", "B2B podešavanja", "/B2B-settings", faCog, MainMenuGroups.SETTINGS ],
  [ "LOCAT", "Lokacije", "/locations", faSearchLocation, MainMenuGroups.SETTINGS ],

  [ "IMPORT", "Uvoz podataka", "/import", faUpload, MainMenuGroups.TOOLS ]
]

export const easyScreensData = screenDateDef.map((item) => ({
  screen_code: item[0],
  name       : item[1],
  path       : item[2],
  icon       : item[3],
  group      : item[4]
}))

export const screensData = easyScreensData.reduce((acc, screen) => {
  acc[screen.screen_code] = screen
  return acc
}, {})

export const inventoryOptions = [
  { id: 1, name: "Više lokacija" },
  { id: null, name: "Jedna lokacija" }
]

export const regax =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
