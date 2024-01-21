import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0AxMjQuY29tIiwiaWQiOiI2NTk3Yjg3OTY0NzQ2M2U3NmI1MGVkZWIiLCJpYXQiOjE3MDU0OTAxMDYsImV4cCI6MTcwNTc0OTMwNn0.9zxjXDm5nxuFw0kPllLH8BErmqLg4wAxzkYAHVjlB4U"
}

const slice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setToken : (state,action) => {
            state.token = action.payload
        },
        
        
    }
}) 

export const {setToken} = slice.actions;
export default slice.reducer;