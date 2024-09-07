import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import UserService from "../../api/UserService";

type AuthState = {
  isAuth: boolean;
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  isAuth: false,
  user: null,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData: IUser, { rejectWithValue }) => {
    try {
      const response = await new Promise<{ user: IUser }>((resolve, reject) => {
        setTimeout(async () => {
          const resp = await UserService.getUsers();
          const mockUser = resp.data.find(
            (user) =>
              user.username === userData.username &&
              user.password === userData.password
          );
          if (mockUser) {
            resolve({ user: userData });
          } else {
            reject(new Error("Invalid credentials"));
          }
        }, 1000);
      });
      return response.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuth = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isAuth = true;
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
