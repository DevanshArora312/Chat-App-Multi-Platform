import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0A2OS5jb20iLCJpZCI6IjY1ZjE1Njc4OTE0ZWJjYTExNDE1ZDIxYiIsImlhdCI6MTcxMDQzOTA1OCwiZXhwIjoxNzEwNjk4MjU4fQ.HtdpXRXIjrMJ8SncS7HC6AXnoC6dUYC4axTpGhWiz58eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0A2OS5jb20iLCJpZCI6IjY1ZjE1Njc4OTE0ZWJjYTExNDE1ZDIxYiIsImlhdCI6MTcxMDQ0MDkzMywiZXhwIjoxNzEwNzAwMTMzfQ.mi_7g04LsVAwL_h3KnLemrHL80cgPTS1KuLscTjrJmc"
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