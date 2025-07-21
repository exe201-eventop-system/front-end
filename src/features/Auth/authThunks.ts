import { createGetThunk, createPostThunk, createPutThunk } from "../genericsCreateThunk";
import {
  LoginRequest,
  LoginResponse,
  OPTRequest,
} from "../../types/Auth/Login.type";
import {
  RegisterRequest,
  ConfirmEmailResponse,
} from "../../types/Auth/Register.type";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/api/axiosInstance";
import {
  Province,
  District,
  Ward,
  ProvinceDetailResponse,
  DistrictDetailResponse,
} from "../../types/Auth/Location.type";
import { User, UserProfile } from "../../types/Auth/User.type";

export const signIn = createPostThunk<LoginResponse, LoginRequest>(
  "auth/sign-in",
  "auth/sign-in",
);
export const sentOTP = createPostThunk<void, OPTRequest>(
  `auth/send-otp`,
  `auth/send-otp`,
);
export const getProfile = createGetThunk<UserProfile, void>(
  `users/profile`,
  `users/profile`,
);
export const signUp = createAsyncThunk<string, RegisterRequest, { rejectValue: string }>(
  "auth/sign-up",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/sign-up", payload);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Đăng ký thất bại";
      console.error("Signup error:", message);
      return rejectWithValue(message);
    }
  }
);
export const profile = createGetThunk<User, void>(
  `user`,
  `user`,
);
export const updateProfile = createPutThunk<UserProfile, UserProfile>(
  `user/update`,
  `user`,
);
export const confirmEmail = createPostThunk<
  ConfirmEmailResponse,
  { access_token: string }
>("auth/confirm-email", "auth/confirm-email", {
});

export const fetchProvinces = createAsyncThunk<Province[]>(
  "location/fetchProvinces",
  async (_, { rejectWithValue }) => {
    const response = await axios.get<Province[]>(
      `https://provinces.open-api.vn/api/p`
    );
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      return rejectWithValue("Response is not an array");
    }
  }
);
export const fetchDistricts = createAsyncThunk<District[], number>(
  "location/fetchDistricts",
  async (provinceCode, { rejectWithValue }) => {
    const response = await axios.get<ProvinceDetailResponse>(
      `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
    );
    if (response.data?.districts) {
      return response.data.districts;
    } else {
      return rejectWithValue("Không có dữ liệu quận/huyện");
    }
  }
);

export const fetchWards = createAsyncThunk<Ward[], number>(
  "location/fetchWards",
  async (districtCode, { rejectWithValue }) => {
    const response = await axios.get<DistrictDetailResponse>(
      `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
    );
    if (response.data?.wards) {
      return response.data.wards;
    } else {
      return rejectWithValue("Không có dữ liệu xã/phường");
    }
  }
);