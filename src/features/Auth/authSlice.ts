import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  signUp,
  confirmEmail,
  fetchDistricts,
  fetchProvinces,
  fetchWards,
  signIn,
  getProfile,
  updateProfile,
} from "./authThunks";
import { handleTokenStorage } from "../../utils/jwt/JwtHelper";
import { UserProfile } from "../../types/Auth/User.type";

interface AuthState {
  isAuthenticated: boolean;
  isLoading?: boolean;
  error: string | null;
  user: UserProfile;
  errorMessage: string | null;
  authType: "login" | "register";
  provinces: { code: number; name: string }[];
  districts: { code: number; name: string }[];
  wards: { code: number; name: string }[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("access_token") !== null,
  user: {
    email: '',
    user_name: '',
    address: '',
    avatar: '',
    phone_number: '',
  },
  authType: "login",
  isLoading: false,
  error: null,
  errorMessage: null,
  provinces: [],
  districts: [],
  wards: [],
  status: 'idle',
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.error = null;
      state.errorMessage = null;
      localStorage.clear();
      state.status = 'idle';
    },
    setAuthType: (state, action) => {
      state.authType = action.payload;
    },
    switchAuthType: (
      state,
      action: PayloadAction<"login" | "register" | undefined>
    ) => {
      if (action.payload) {
        state.authType = action.payload;
      } else {
        state.authType = state.authType === "login" ? "register" : "login";
      }
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.error = null;
        state.errorMessage = null;
        state.status = 'pending';
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.status = "succeeded";
        state.user = action.payload.data ?? {
          email: '',
          user_name: '',
          address: '',
          avatar: '',
          phone_number: '',
        };

      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.data ?? {
          email: '',
          user_name: '',
          address: '',
          avatar: '',
          phone_number: '',
        };
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload ?? "Unknown error";
        state.errorMessage = action.payload as string || "Unknown error";
        state.status = 'failed';
      })
      .addCase(signIn.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.status = 'failed';
      })
      .addCase(signUp.pending, (state) => {
        state.error = null;
        state.errorMessage = null;
        state.status = 'pending';
      })
      .addCase(signUp.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null; // Clear any previous errors
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload ?? "Unknown error";
        state.errorMessage = action.payload as string || "Unknown error";
        state.status = 'failed';
      })

      // Xử lý confirmEmail
      .addCase(confirmEmail.pending, (state) => {
        state.status = 'pending';
        state.error = null;
        state.errorMessage = null;
      })
      .addCase(confirmEmail.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        const token = action.payload.data?.access_token ?? "";
        handleTokenStorage(token);
      })
      .addCase(confirmEmail.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload ?? "Xác nhận email thất bại";
        state.errorMessage = action.payload ?? "Xác nhận email thất bại";
        state.status = 'failed';
      })
      .addCase(fetchProvinces.fulfilled, (state, action) => {
        state.provinces = action.payload;
      })
      .addCase(fetchDistricts.fulfilled, (state, action) => {
        state.districts = action.payload;
      })
      .addCase(fetchWards.fulfilled, (state, action) => {
        state.wards = action.payload;
      })

  },
});

export const { logout, setAuthType, switchAuthType } = authSlice.actions;
export default authSlice.reducer;