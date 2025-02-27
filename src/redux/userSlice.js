import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    userLogout: (state) => {
      Cookies.remove("access_token");
      state.user = null;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { userLogout, login } = userSlice.actions;

export default userSlice.reducer;
