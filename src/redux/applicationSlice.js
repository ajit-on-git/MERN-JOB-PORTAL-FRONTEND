import { createSlice } from "@reduxjs/toolkit";

// github complete

const applicationSlice = createSlice({
    name:'application',
    initialState:{
        applicants:null,
    },
    reducers:{
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
        }
    }
});
export const {setAllApplicants} = applicationSlice.actions;
export default applicationSlice.reducer;