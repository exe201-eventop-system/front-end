import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  signUp,
  confirmEmail,
  fetchDistricts,
  fetchProvinces,
  fetchWards,
  signIn,
} from "./authThunks";
import { UserRole } from "../../types/User.type";
import { JwtHelper } from "../../utils/jwt/JwtHelper";

interface AuthState {
  isAuthenticated: boolean;
  access_token: string | null;
  isLoading?: boolean;
  error: string | null;
  authType: "login" | "register";
  provinces: { code: number; name: string }[];
  districts: { code: number; name: string }[];
  wards: { code: number; name: string }[];
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("access_token") !== null,
  access_token: localStorage.getItem("access_token"),
  authType: "login",
  isLoading: false,
  error: null,
  provinces: [],
  districts: [],
  wards: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.access_token = null;
      state.error = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_role");
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isAuthenticated = true;
      
        const token = action.payload.data?.access_token ?? "";
        localStorage.setItem("access_token", token);
      
        const helper = new JwtHelper(token);
        const payload = helper.getPayload();
      
        const roleFromToken = payload?.Role;
      
        const isValidRole = Object.values(UserRole).includes(roleFromToken as UserRole);
      
        const roleToStore = isValidRole ? (roleFromToken as UserRole) : null;
      
        localStorage.setItem("user_role", roleToStore ?? "");

      

      })
      

      .addCase(signUp.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.access_token = null;
        state.error = action.payload ?? "Unknown error";
      })

      // Xử lý confirmEmail
      .addCase(confirmEmail.fulfilled, (state, action) => {
        const token = action.payload.data?.access_token ?? "";

        state.isAuthenticated = true;
        localStorage.setItem("access_token", token);


        const helper = new JwtHelper(token);
        const payload = helper.getPayload();

        const roleFromToken = payload?.role;
        const isValidRole = Object.values(UserRole).includes(roleFromToken as UserRole);
        const roleToStore = isValidRole ? (roleFromToken as UserRole) : null;

        localStorage.setItem("user_role", roleToStore ?? "");
      })
      .addCase(confirmEmail.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.access_token = null;
        state.error = action.payload ?? "Xác nhận email thất bại";
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