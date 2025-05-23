import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  signUp,
  confirmEmail,
  fetchDistricts,
  fetchProvinces,
  fetchWards,
} from "./authThunks";
import {
  saveToLocalStorage,
  removeFromLocalStorage,
  getFromLocalStorage,
} from "../../utils/localStorageHelper";

interface AuthState {
  isAuthenticated: boolean;
  access_token: string | null;
  refresh_token: string | null;
  error: string | null;
  authType: "login" | "register";
  provinces: { code: number; name: string }[];
  districts: { code: number; name: string }[];
  wards: { code: number; name: string }[];
}

const initialState: AuthState = {
  isAuthenticated: getFromLocalStorage("access_token") !== null,
  access_token: getFromLocalStorage("access_token"),
  refresh_token: getFromLocalStorage("refresh_token"),
  authType: "login",
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
      state.refresh_token = null;
      state.error = null;
      removeFromLocalStorage("access_token");
      removeFromLocalStorage("refresh_token");
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
      .addCase(signUp.pending, (state) => {
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        saveToLocalStorage(
          "access_token",
          action.payload.data?.access_token ?? ""
        );
        saveToLocalStorage(
          "refresh_token",
          action.payload.data?.refresh_token ?? ""
        );
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.access_token = null;
        state.refresh_token = null;
        state.error = action.payload ?? "Unknown error";
      })

      // Xử lý confirmEmail
      .addCase(confirmEmail.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        saveToLocalStorage(
          "access_token",
          action.payload.data?.access_token ?? ""
        );
        saveToLocalStorage(
          "refresh_token",
          action.payload.data?.refresh_token ?? ""
        );
      })
      .addCase(confirmEmail.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.access_token = null;
        state.refresh_token = null;
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
      });
  },
});

export const { logout, setAuthType, switchAuthType } = authSlice.actions;
export default authSlice.reducer;
