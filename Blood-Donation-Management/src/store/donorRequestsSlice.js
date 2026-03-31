 import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 donorRequests:[
    {
      id: 1,
      name:"Anna",
      phone:"123456789",
      bloodgroup: "O-",
      city:"Lahore",
    },
    {
      id: 1,
      name:"Anna",
      phone:"123456789",
      bloodgroup: "O-",
      city:"Lahore",
    },
  ],

};


const donorRequestSlice = createSlice({
  name: "donorRequests",
  initialState,
  reducers: {
    // donor jab donate kare
    addDonor: (state, action) => {
      state.donorRequests.push({
        id: Date.now(),
        ...action.payload,
      });
    },
  },
});

export const { addDonor, removeDonor } = donorRequestSlice.actions;
export default donorRequestSlice.reducer;