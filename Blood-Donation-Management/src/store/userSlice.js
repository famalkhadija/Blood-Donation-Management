import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null,
  profile: {
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    bloodgroup: "",
    hospitalName: "",
    licenseNumber: "",
  },
  isAuthenticated: false,
  loading: true,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if(!action.payload)
      return;
      state.user = action.payload;
      state.role = action.payload.role;
      state.profile = action.payload.profile;
      state.isAuthenticated = true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    registerUser: (state, action) => {
      state.role = action.payload.role;
      state.profile = action.payload.profile;
      state.isAuthenticated = true;
    },

    loginUser: (state, action) => {
      state.role = action.payload.role;
      state.profile = action.payload.profile;
      state.isAuthenticated = true;
    },

    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },

    logoutUser: (state) => {
      state.role = null;
      state.isAuthenticated = false;
      state.profile = {
        name: "",
        email: "",
        phone: "",
        city: "",
        bloodgroup: "",
        hospitalName: "",
        licenseNumber: "",
      };
    },
  },
});

export const { setUser,setLoading, registerUser, loginUser, updateProfile, logoutUser } =
  userSlice.actions;

export default userSlice.reducer;
