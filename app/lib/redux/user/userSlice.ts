import { User } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "@reduxjs/toolkit";

const initialUser: User = {
    id: '',
    name: '',
    username: '',
    email: '',
    password: '',
    profilePicture: ''
}

const userSlice = createSlice({

    name: "user",

    initialState: {
        user: initialUser
    },

    reducers: {

        updateUser: (state, userInfo: PayloadAction<User>) => {

            state.user = {
                id: userInfo.payload.id,
                name: userInfo.payload.name,
                username: userInfo.payload.username,
                email: userInfo.payload.email,
                password: userInfo.payload.password,
                profilePicture: userInfo.payload.profilePicture
            }

        }
        
    }

})

export const { updateUser } =  userSlice.actions;

export default userSlice.reducer;
