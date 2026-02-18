import reducer from "./userSlice";
import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers:{
        showFeed: (state, action) =>{
            return action.payload
        },
        removeFeed: (state, action) =>{
            return null
        }
    }
})

export const {showFeed, removeFeed} = feedSlice.actions;
export default feedSlice.reducer;