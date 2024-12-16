import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reloadFlags: {}, // Keys are component IDs and values are boolean flag-s
};

export const reloadsSlice = createSlice({
    name: "reloads",
    initialState,
    reducers: {
        triggerComponentRerender: (state, action) => {
            const componentId = action.payload; // ID of the component being rerendered
            state.reloadFlags[componentId] = !state.reloadFlags[componentId]; // Toggling flag for a specific component
        },
    },
});

export const { triggerComponentRerender } = reloadsSlice.actions;
export default reloadsSlice.reducer;
