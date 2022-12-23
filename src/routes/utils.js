import React, { Fragment } from "react";
import { Route } from "react-router-dom";

/** The menu MenuGroups to show menu items in. */
export const MenuGroup = {
  PRODUCT: { order: 0, name: "Katalog" },
  B2B: { order: 1, name: "B2B" },
  B2C: { order: 2, name: "B2C" },
  SETTINGS: { order: 3, name: "Podešavanja" },
  TOOLS: { order: 4, name: "Alati" },
};

/**
 * Make a screen object from the array.
 *
 * @param {[]} screen The original screen, as defined in the routes.js.
 * @param {string} parentPath The path of the parent screen.
 *
 * @return {AvailableScreen}
 */
export const makeScreen = (screen, parentPath) => {

  // Quick screen without name
  if (screen.length === 2) {
    screen = [screen[0], null, null, null, screen[1], []];
  }

  // Append the parent path
  if (parentPath) {
    screen[0] = `${parentPath}/${screen[0]}`;
  }

  return {
    path: screen[0],
    name: screen[1],
    icon: screen[2],
    group: screen[3],
    component: screen[4],
    children:
      (screen[5] ?? [])?.map((child) => makeScreen(child, screen[0])) ?? [],
  };
};

/**
 * Create a route for a screen.
 *
 * @param {AvailableScreen} screen The screen to create the route for
 * @return {Route}
 */
export const makeRoute = (screen) =>
  screen?.component ? (
    <Fragment key={screen.path}>
      {screen.children?.map(makeRoute)}
      <Route
        path={screen.path}
        element={React.createElement(screen.component)}
      />
    </Fragment>
  ) : null;
