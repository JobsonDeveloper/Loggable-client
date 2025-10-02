import User from "@/model/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  id: "",
  firstName: "",
  lastName: "",
  userEmail: "",
  userPassword: "",
  role: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.userEmail = action.payload.userEmail;
      state.userPassword = action.payload.userPassword;
      state.role = action.payload.role;
    },
  },
});

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;
