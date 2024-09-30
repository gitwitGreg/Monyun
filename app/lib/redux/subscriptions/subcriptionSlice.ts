import { User } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "@reduxjs/toolkit";

const initialSubscriptions = {
    subscriptions: ''
}

const subscriptionSlice = createSlice({

    name: "subsciption",

    initialState: {
        user: initialSubscriptions
    },

    reducers: {

        updateSubscriptions: (state, subscriptionInfo: PayloadAction<any>) => {


            state.user = {
                subscriptions: subscriptionInfo.payload.subscriptions,
            }

        }
        
    }

})

export const { updateSubscriptions } =  subscriptionSlice.actions;

export default subscriptionSlice.reducer;