import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import requestReducer from "./requestSlice";
import donorRequestReducer from "./donorRequestsSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    requests: requestReducer,
    donorRequests: donorRequestReducer,
  },
});
