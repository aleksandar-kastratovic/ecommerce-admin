import { configureStore } from "@reduxjs/toolkit";
import reloadsReducer from "./reloads/reloadsReducer";

export const store = configureStore({
    reducer: {
        reloads: reloadsReducer,
    },
});
