import { configureStore } from "@reduxjs/toolkit";
import AlertSlice from '@/store/reducers/Alert'

export const store = configureStore({
    reducer: {
        alert: AlertSlice
    },
    // middleware: (getDefaultMiddleware) =>
        // getDefaultMiddleware().concat.(api.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>