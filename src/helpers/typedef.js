/** @typedef {number} int A whole number. **/
/** @typedef {number} uint An unsigned whole number. **/

/**
 * @typedef FieldSpec
 *      @param {string} field_name The human-friendly name of the field, used for the label.
 *      @param {string} prop_name The ULR-friendly name of the field.
 *      @param {boolean} in_main_table True to be visible in the main list table.
 *      @param {boolean} in_details True to be visible in the details.
 *      @param {boolean} editable True to make this field editable via a form.
 *      @param {boolean} disabled True to make this field read-only.
 *      @param {boolean} required True to make this field required
 *      @param {string} description
 *      @param {string} ui_prop
 *      @param {boolean} sortable True to allow list table to sort by this field.
 *      @param {string} input_type
 */

/**
 * @typedef APIPagination
 *      @param {uint} selected_page The current page that is show.
 *      @param {uint} total_pages The total number of pages that are available.
 *      @param {uint} total_items The total number of items, across all pages.
 *      @param {uint} items_per_page The limit of items to show per a single page.
 */

/**
 * @typedef PanelSpec
 *      @param {int} id The unique id of the panel.
 *      @param {string} name The name of the panel.
 *      @param {string|{}} icon String to load from MUI, or an object imported from @fortawesome/free-solid-svg-icons;
 *      @param {boolean} enabled True to allow selecting this panel, defaults to true if omitted.
 *      @param {JSX.Element} component The component that will handle this panel
 */
