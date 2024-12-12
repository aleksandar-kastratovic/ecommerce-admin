import { createPairs } from "../helpers/data";

/**
 * Determines the visible fields for the ListPage component.
 * If data exists in localStorage under the specified key, it uses that data.
 * Otherwise, it initializes localStorage with default fields and generates pairs.
 *
 * @param {string} localStorageKey - The key used to check and store data in localStorage.
 * @param {Array} defaultFields - An array of objects to be used if localStorage is empty or undefined.
 * @returns {Object} The visible fields object.
 */
export const getVisibleFields = (localStorageKey, defaultFields) => {
    let visibleFields;

    const inLocalStorage = JSON.parse(localStorage.getItem(localStorageKey));
    if (inLocalStorage !== null && Object.keys(inLocalStorage).length > 0) {
        visibleFields = inLocalStorage;
    } else {
        visibleFields = createPairs(defaultFields, "prop_name", "in_main_table");
        localStorage.setItem(localStorageKey, JSON.stringify(visibleFields));
    }

    return visibleFields;
};
