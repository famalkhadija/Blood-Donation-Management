import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [
    {
      id: 1,
      hospital: "City Hospital",
      bloodgroup: "A+",
      date: "12-02-2026",
      status: "Pending",
      city:"Lahore",
    },
    {
      id: 2,
      hospital: "Life Care",
      bloodgroup: "O-",
      date: "10-02-2026",
      status: "Pending",
      city:"Lahore",
      
    },
  ],
};
const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {

    // create request (donor)
    createRequest: (state, action) => {
      state.requests.push({
        id: Date.now(),
        ...action.payload,
        status: "Pending",
      });
    },
    // donor/hospital accept
    acceptRequest: (state, action) => {
      const req = state.requests.find(r => r.id === action.payload);
      if (req) {
        req.status = "Completed";
      }
    },

  },
});

export const { createRequest, acceptRequest } = requestSlice.actions;

export default requestSlice.reducer;
