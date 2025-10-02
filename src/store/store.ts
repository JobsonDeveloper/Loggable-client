import { configureStore } from "@reduxjs/toolkit";
import GlobalLoading from '@/store/reducers/GlobalLoading'
import User from '@/store/reducers/User'

export const store = configureStore({
    reducer: {
        globalLoading: GlobalLoading,
        user: User
    },
    // middleware: (getDefaultMiddleware) =>
        // getDefaultMiddleware().concat.(api.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>