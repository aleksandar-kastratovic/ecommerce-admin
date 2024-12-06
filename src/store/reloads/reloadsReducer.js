import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listPageReload: false,
};

export const reloadsSlice = createSlice({
    name: "reloads",
    initialState,
    reducers: {
        triggerListPageReload: (state) => {
            state.listPageReload = !state.listPageReload;
        },
    },
});

export const { triggerListPageReload } = reloadsSlice.actions;
export default reloadsSlice.reducer;
