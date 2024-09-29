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

            console.log('Updating subscriptions with:', subscriptionInfo.payload.subscriptions);

            state.user = {
                subscriptions: subscriptionInfo.payload.subscriptions,
            }

            console.log('Updated state:', state.user);

        }
        
    }

})

export const { updateSubscriptions } =  subscriptionSlice.actions;

export default subscriptionSlice.reducer;