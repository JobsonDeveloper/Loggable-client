import { configureStore } from "@reduxjs/toolkit";
import GlobalLoading from '@/store/reducers/GlobalLoading'

export const store = configureStore({
    reducer: {
        globalLoading: GlobalLoading
    },
    // middleware: (getDefaultMiddleware) =>
        // getDefaultMiddleware().concat.(api.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>