import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reloadFlags: {}, // Ključevi su ID-ovi tabela, vrednosti su boolean flag-ovi
};

export const reloadsSlice = createSlice({
    name: "reloads",
    initialState,
    reducers: {
        triggerListPageReload: (state, action) => {
            const tableId = action.payload; // ID tabele koji se osvežava
            state.reloadFlags[tableId] = !state.reloadFlags[tableId]; // Toggling flag za specifičnu tabelu
        },
    },
});

export const { triggerListPageReload } = reloadsSlice.actions;
export default reloadsSlice.reducer;
