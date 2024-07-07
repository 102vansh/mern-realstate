import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    user: null,
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: "user",
    initialState: initalState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteuser: (state) => {
            state.user = null;
    },
    logoutuser: (state) => {
        state.user = null;
    },
    updateuser: (state, action) => {
        state.user = action.payload;
}
    }
});
        export const {loginStart, loginSuccess, loginFailure,deleteuser,logoutuser,updateuser} = userSlice.actions;

export default userSlice.reducer;
