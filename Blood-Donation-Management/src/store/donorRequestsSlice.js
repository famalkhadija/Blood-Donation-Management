import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  donorRequests: [],
};

const donorRequestSlice = createSlice({
  name: "donorRequests",
  initialState,
  reducers: {
    //set donor requests from backend
    setDonorRequests: (state, action) => {
      state.donorRequests = action.payload;
    },
    // donor jab donate kare add donor
    addDonor: (state, action) => {
      state.donorRequests.push(action.payload);
    },
  },
});

export const { setDonorRequests, addDonor } = donorRequestSlice.actions;
export default donorRequestSlice.reducer;
