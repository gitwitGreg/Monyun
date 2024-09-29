import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import subcriptionReducer from './subscriptions/subcriptionSlice';


export const store = configureStore({

    reducer: {

        userSlice: userReducer,

        subscription: subcriptionReducer

    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

