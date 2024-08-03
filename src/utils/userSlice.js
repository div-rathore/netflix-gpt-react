import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
  },
});

//Actions and reducers are required to be exported from the slice
export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
