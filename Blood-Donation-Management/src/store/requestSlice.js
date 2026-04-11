import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [],
};
const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    //set requests from backend
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    // create request (donor)
    createRequest: (state, action) => {
      state.requests.push(action.payload);
    },
    //  accept request
    acceptRequest: (state, action) => {
      const req = state.requests.find((r) => r.id === action.payload);
      if (req) {
        req.status = "Completed";
      }
    },
  },
});

export const { setRequests, createRequest, acceptRequest } =
  requestSlice.actions;

export default requestSlice.reducer;
