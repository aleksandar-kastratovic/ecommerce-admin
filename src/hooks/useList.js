import { useState } from "react";
import { removeAtIndex } from "../helpers/data";

/**
 * Used to store the list of items with useful methods.
 *
 * @param {[]} initialList The initial list to use.
 *
 * @return {[list: [], set: function(id), unset: function(id), has: function(id)]} The list of controls for the list.
 */
const useFileInput = (initialList: [] = []) => {
    const [state, setState] = useState(initialList);

    // Set a value
    const set = (id) => {
        if (!state.includes(id)) {
            setState((state) => [...state, id]);
        }
    };

    // Unset a value
    const unset = (id) => {
        const index = state.findIndex((item) => item === id);
        if (index > -1) {
            setState((state) => removeAtIndex(state, index));
        }
    };

    // Toggle the urrent value
    const toggle = (id) => {
        state.includes(id) ? unset(id) : set(id);
    };

    // Check if list has an item
    const has = (id) => state.includes(id);

    const clear = () => setState([]);

    return { list: state, set, unset, toggle, has, clear };
};

export default useFileInput;
